#!/bin/bash

# API Key Management Test Script
# This script tests the API key functionality

BASE_URL="http://localhost:3000"
API_BASE="$BASE_URL/api/v1"

echo "================================"
echo "API Key Management Test Suite"
echo "================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

# Function to print test results
print_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓ PASS${NC}: $2"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗ FAIL${NC}: $2"
        ((TESTS_FAILED++))
    fi
}

# Function to print section header
print_section() {
    echo ""
    echo -e "${YELLOW}=== $1 ===${NC}"
    echo ""
}

# Test 1: Check if server is running
print_section "Server Health Check"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL")
if [ "$HTTP_CODE" -eq 200 ]; then
    print_result 0 "Server is running at $BASE_URL"
else
    print_result 1 "Server is not responding (HTTP $HTTP_CODE)"
    exit 1
fi

# Test 2: Test unauthenticated access to API keys page
print_section "Authentication Tests"
echo "Testing unauthenticated access to /dashboard/api-keys..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -L "$BASE_URL/dashboard/api-keys")
if [ "$HTTP_CODE" -eq 200 ]; then
    # Check if redirected to signin (NextAuth behavior)
    RESPONSE=$(curl -s -L "$BASE_URL/dashboard/api-keys")
    if echo "$RESPONSE" | grep -q "sign" || echo "$RESPONSE" | grep -q "auth"; then
        print_result 0 "Unauthenticated users are redirected to auth page"
    else
        print_result 1 "Page accessible without authentication"
    fi
else
    print_result 0 "Protected route returns HTTP $HTTP_CODE for unauthenticated users"
fi

# Test 3: Test API endpoints without authentication
print_section "API Endpoint Security Tests"

echo "Testing GET /api/v1/token without auth..."
RESPONSE=$(curl -s "$API_BASE/token")
if echo "$RESPONSE" | grep -q "Authorization header missing"; then
    print_result 0 "GET /api/v1/token requires authorization"
else
    echo "Response: $RESPONSE"
    print_result 1 "GET /api/v1/token should require authorization"
fi

echo "Testing POST /api/v1/token without auth..."
RESPONSE=$(curl -s -X POST "$API_BASE/token" -H "Content-Type: application/json" -d '{"name":"test"}')
if echo "$RESPONSE" | grep -q "Authorization header missing"; then
    print_result 0 "POST /api/v1/token requires authorization"
else
    echo "Response: $RESPONSE"
    print_result 1 "POST /api/v1/token should require authorization"
fi

# Test 4: Test token creation endpoint with session auth
print_section "Token Creation Endpoint Tests"

echo "Testing POST /api/v1/token/create without session..."
RESPONSE=$(curl -s -X POST "$API_BASE/token/create" -H "Content-Type: application/json" -d '{"name":"test"}')
if echo "$RESPONSE" | grep -q "Authentication required" || echo "$RESPONSE" | grep -q "Please sign in"; then
    print_result 0 "POST /api/v1/token/create requires authentication"
else
    echo "Response: $RESPONSE"
    print_result 1 "POST /api/v1/token/create should require authentication"
fi

echo "Testing GET /api/v1/token/create without session..."
RESPONSE=$(curl -s "$API_BASE/token/create")
if echo "$RESPONSE" | grep -q "Authentication required" || echo "$RESPONSE" | grep -q "Please sign in"; then
    print_result 0 "GET /api/v1/token/create requires authentication"
else
    echo "Response: $RESPONSE"
    print_result 1 "GET /api/v1/token/create should require authentication"
fi

# Test 5: Test invalid Bearer token
print_section "Bearer Token Authentication Tests"

echo "Testing with invalid Bearer token..."
RESPONSE=$(curl -s -H "Authorization: Bearer invalid_token_12345" "$API_BASE/token")
if echo "$RESPONSE" | grep -q "Invalid" || echo "$RESPONSE" | grep -q "error"; then
    print_result 0 "Invalid Bearer token is rejected"
else
    echo "Response: $RESPONSE"
    print_result 1 "Invalid Bearer token should be rejected"
fi

# Test 6: Test malformed authorization header
echo "Testing with malformed authorization header..."
RESPONSE=$(curl -s -H "Authorization: InvalidFormat token123" "$API_BASE/token")
if echo "$RESPONSE" | grep -q "Invalid authorization format" || echo "$RESPONSE" | grep -q "Bearer"; then
    print_result 0 "Malformed authorization header is rejected"
else
    echo "Response: $RESPONSE"
    print_result 1 "Malformed authorization header should be rejected"
fi

# Test 7: Check if API keys page route exists
print_section "Route Availability Tests"

echo "Checking if /dashboard/api-keys route exists..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/dashboard/api-keys")
if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 307 ] || [ "$HTTP_CODE" -eq 302 ]; then
    print_result 0 "API keys page route exists (HTTP $HTTP_CODE)"
else
    print_result 1 "API keys page route not found (HTTP $HTTP_CODE)"
fi

# Test 8: Check API endpoint routes
echo "Checking if API endpoints are registered..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$API_BASE/token")
if [ "$HTTP_CODE" -eq 401 ]; then
    print_result 0 "API endpoint /api/v1/token is registered"
else
    print_result 1 "API endpoint /api/v1/token returns unexpected code (HTTP $HTTP_CODE)"
fi

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$API_BASE/token/create")
if [ "$HTTP_CODE" -eq 401 ]; then
    print_result 0 "API endpoint /api/v1/token/create is registered"
else
    print_result 1 "API endpoint /api/v1/token/create returns unexpected code (HTTP $HTTP_CODE)"
fi

# Summary
print_section "Test Summary"
TOTAL_TESTS=$((TESTS_PASSED + TESTS_FAILED))
echo "Total Tests: $TOTAL_TESTS"
echo -e "${GREEN}Passed: $TESTS_PASSED${NC}"
echo -e "${RED}Failed: $TESTS_FAILED${NC}"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}All tests passed! ✓${NC}"
    exit 0
else
    echo -e "${RED}Some tests failed. Please review the output above.${NC}"
    exit 1
fi
