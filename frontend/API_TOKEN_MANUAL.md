# API Token Management Manual

This guide explains how to use the API token system for authentication with external services.

## Overview

The API token system provides secure authentication for external services to access your application's API endpoints. It supports two authentication methods:

- **Session-based authentication** - For web applications and initial token creation
- **Bearer token authentication** - For API clients and service-to-service communication

## Getting Started

### For New Users

If you're a new user without any existing tokens, you need to create your first token using session authentication:

1. **Sign in to the web application** at `http://localhost:3000/auth/signin`
2. **Create your first token** using the session-based endpoint

### For Existing Users

If you already have an API token, you can use bearer token authentication for all operations.

## API Endpoints

### Base URL
```
http://localhost:3000/api/v1/token
```

### Authentication Methods

#### 1. Session-Based (For New Users)
- **Endpoint**: `/api/v1/token/create`
- **Authentication**: NextAuth.js session cookies
- **Use case**: Web applications, initial token creation

#### 2. Bearer Token (For API Services)
- **Endpoint**: `/api/v1/token`
- **Authentication**: `Authorization: Bearer <token>` header
- **Use case**: API clients, external services

## API Operations

### 1. Create First Token (Session-Based)

**Endpoint**: `POST /api/v1/token/create`

**Headers**:
```
Content-Type: application/json
Cookie: <session-cookies>
```

**Request Body**:
```json
{
  "name": "My First API Token",
  "expiresAt": "2025-12-31T23:59:59Z"  // Optional
}
```

**Response**:
```json
{
  "message": "Token created successfully",
  "token": {
    "id": "cmg0o1x400001lacs3uhvlk19",
    "name": "My First API Token",
    "token": "b4a1426748cce9436c0f27be0d9982a89203e93673a98043ee9de5a9d44dbf7c",
    "isActive": true,
    "expiresAt": "2025-12-31T23:59:59.000Z",
    "createdAt": "2025-09-26T09:55:27.840Z"
  }
}
```

### 2. List All Tokens

**Endpoint**: `GET /api/v1/token`

**Headers**:
```
Authorization: Bearer <your-token>
```

**Response**:
```json
{
  "tokens": [
    {
      "id": "cmg0o1x400001lacs3uhvlk19",
      "name": "My API Token",
      "token": "b4a1426748cce9436c0f27be0d9982a89203e93673a98043ee9de5a9d44dbf7c",
      "isActive": true,
      "expiresAt": "2025-12-31T23:59:59.000Z",
      "createdAt": "2025-09-26T09:55:27.840Z",
      "updatedAt": "2025-09-26T09:55:58.135Z"
    }
  ]
}
```

### 3. Create New Token

**Endpoint**: `POST /api/v1/token`

**Headers**:
```
Content-Type: application/json
Authorization: Bearer <your-token>
```

**Request Body**:
```json
{
  "name": "Service API Token",
  "expiresAt": "2025-12-31T23:59:59Z"  // Optional
}
```

**Response**:
```json
{
  "token": {
    "id": "new-token-id",
    "name": "Service API Token",
    "token": "newly-generated-token-string",
    "isActive": true,
    "expiresAt": "2025-12-31T23:59:59.000Z",
    "createdAt": "2025-09-26T09:55:27.840Z"
  }
}
```

### 4. Get Specific Token

**Endpoint**: `GET /api/v1/token/{token-id}`

**Headers**:
```
Authorization: Bearer <your-token>
```

**Response**:
```json
{
  "token": {
    "id": "cmg0o1x400001lacs3uhvlk19",
    "name": "My API Token",
    "token": "b4a1426748cce9436c0f27be0d9982a89203e93673a98043ee9de5a9d44dbf7c",
    "isActive": true,
    "expiresAt": "2025-12-31T23:59:59.000Z",
    "createdAt": "2025-09-26T09:55:27.840Z",
    "updatedAt": "2025-09-26T09:55:58.135Z"
  }
}
```

### 5. Update Token

**Endpoint**: `PUT /api/v1/token/{token-id}`

**Headers**:
```
Content-Type: application/json
Authorization: Bearer <your-token>
```

**Request Body** (all fields optional):
```json
{
  "name": "Updated Token Name",
  "isActive": false,
  "expiresAt": "2026-01-01T00:00:00Z"
}
```

**Response**:
```json
{
  "token": {
    "id": "cmg0o1x400001lacs3uhvlk19",
    "name": "Updated Token Name",
    "token": "b4a1426748cce9436c0f27be0d9982a89203e93673a98043ee9de5a9d44dbf7c",
    "isActive": false,
    "expiresAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2025-09-26T10:00:00.000Z"
  }
}
```

### 6. Delete Token

**Endpoint**: `DELETE /api/v1/token/{token-id}`

**Headers**:
```
Authorization: Bearer <your-token>
```

**Response**:
```json
{
  "message": "Token deleted successfully"
}
```

## cURL Examples

### Create First Token (Web Browser Session Required)

1. **Sign in through browser** at `http://localhost:3000/auth/signin`
2. **Extract session cookies** from browser developer tools
3. **Create token**:

```bash
curl -X POST http://localhost:3000/api/v1/token/create \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -d '{
    "name": "My First API Token",
    "expiresAt": "2025-12-31T23:59:59Z"
  }'
```

### Bearer Token Operations

```bash
# Set your token as a variable
export API_TOKEN="your-token-here"

# List all tokens
curl -H "Authorization: Bearer $API_TOKEN" \
  http://localhost:3000/api/v1/token

# Create new token
curl -X POST http://localhost:3000/api/v1/token \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_TOKEN" \
  -d '{
    "name": "New Service Token",
    "expiresAt": "2025-12-31T23:59:59Z"
  }'

# Get specific token
curl -H "Authorization: Bearer $API_TOKEN" \
  http://localhost:3000/api/v1/token/TOKEN_ID

# Update token
curl -X PUT http://localhost:3000/api/v1/token/TOKEN_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $API_TOKEN" \
  -d '{
    "name": "Updated Token Name",
    "isActive": true
  }'

# Delete token
curl -X DELETE http://localhost:3000/api/v1/token/TOKEN_ID \
  -H "Authorization: Bearer $API_TOKEN"
```

## Error Responses

### 401 Unauthorized
```json
{
  "error": "Authorization header missing"
}
```

```json
{
  "error": "Invalid authorization format. Use Bearer <token>"
}
```

```json
{
  "error": "Invalid or inactive token"
}
```

```json
{
  "error": "Token expired"
}
```

### 400 Bad Request
```json
{
  "error": "Token name is required"
}
```

### 404 Not Found
```json
{
  "error": "Token not found or not owned by user"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to create token"
}
```

## Security Features

- **Secure Token Generation**: Uses `crypto.randomBytes(32)` for strong token generation
- **User Isolation**: Users can only access their own tokens
- **Token Expiration**: Support for optional expiration dates
- **Active/Inactive Status**: Tokens can be disabled without deletion
- **Bearer Authentication**: Industry-standard authorization header format

## Token Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | string | Unique token identifier |
| `name` | string | Human-readable token name |
| `token` | string | The actual token string for authentication |
| `userId` | string | Owner user ID (not exposed in API) |
| `isActive` | boolean | Whether the token is currently active |
| `expiresAt` | DateTime | Optional expiration date |
| `createdAt` | DateTime | Token creation timestamp |
| `updatedAt` | DateTime | Last modification timestamp |

## Best Practices

1. **Store tokens securely** - Never commit tokens to version control
2. **Use descriptive names** - Name tokens based on their purpose
3. **Set expiration dates** - Use expiration dates for temporary access
4. **Rotate tokens regularly** - Create new tokens and delete old ones periodically
5. **Monitor token usage** - Keep track of which tokens are being used
6. **Deactivate unused tokens** - Set `isActive: false` instead of deleting immediately

## Integration Examples

### JavaScript/Node.js
```javascript
const API_TOKEN = process.env.API_TOKEN;
const BASE_URL = 'http://localhost:3000/api/v1';

const response = await fetch(`${BASE_URL}/token`, {
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
```

### Python
```python
import requests
import os

API_TOKEN = os.getenv('API_TOKEN')
BASE_URL = 'http://localhost:3000/api/v1'

headers = {
    'Authorization': f'Bearer {API_TOKEN}',
    'Content-Type': 'application/json'
}

response = requests.get(f'{BASE_URL}/token', headers=headers)
data = response.json()
```

### PHP
```php
<?php
$apiToken = $_ENV['API_TOKEN'];
$baseUrl = 'http://localhost:3000/api/v1';

$headers = [
    'Authorization: Bearer ' . $apiToken,
    'Content-Type: application/json'
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $baseUrl . '/token');
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$data = json_decode($response, true);
curl_close($ch);
?>
```

## Troubleshooting

### Common Issues

1. **"Authorization header missing"**
   - Ensure you're including the `Authorization` header
   - Format: `Authorization: Bearer <token>`

2. **"Invalid or inactive token"**
   - Check if token is still active: `isActive: true`
   - Verify the token string is correct
   - Ensure token hasn't been deleted

3. **"Token expired"**
   - Check the `expiresAt` date
   - Create a new token if needed

4. **"Token not found or not owned by user"**
   - Verify you're using the correct token ID
   - Ensure you're authenticated as the token owner

### Getting Help

If you encounter issues:
1. Check the API response for specific error messages
2. Verify your authentication headers
3. Ensure your token is active and not expired
4. Check server logs for detailed error information