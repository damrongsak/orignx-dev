#!/bin/bash

# signin.sh
EMAIL="damrongsak.sam@gmail.com"
PASSWORD="OrxPass123"
BASE_URL="http://localhost:3000"

echo "Getting CSRF token..."
curl -s -c cookies.txt "${BASE_URL}/api/auth/csrf" > /dev/null

# Extract CSRF token
CSRF_TOKEN=$(curl -s -b cookies.txt "${BASE_URL}/api/auth/csrf" | jq -r '.csrfToken')

echo "CSRF Token: $CSRF_TOKEN"

echo "Signing in..."
curl -X POST "${BASE_URL}/api/auth/callback/credentials" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -b cookies.txt \
  -c cookies.txt \
  -d "csrfToken=${CSRF_TOKEN}&email=${EMAIL}&password=${PASSWORD}&callbackUrl=${BASE_URL}" \
  -s > /dev/null

echo "Creating API token..."
curl -X POST "${BASE_URL}/api/v1/token/create" \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "name": "CLI Generated Token",
    "expiresAt": "2025-12-31T23:59:59Z"
  }'

