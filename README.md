# User Management Backend with Express and MongoDB

This is a user management backend system built with Express.js and MongoDB. It enables user registration, login, profile updates, and account deletion. JWT-based authentication ensures secure access to protected routes, and comprehensive error handling ensures smooth interactions. The MVC architecture promotes code modularity and scalability.

## Endpoints (features)

- `POST /api/crud/register:` Register a new user with name, email, and password.
- `POST /api/crud/login:` Authenticate a user with email and password, providing a JWT token on successful login.
- `GET /api/crud/getuser:` Fetch the authenticated user's profile details.
- `POST /api/crud/updateuser:` Update the authenticated user's profile (name, email, password).
- `GET /api/crud/logout:` Log out the authenticated user and invalidate the JWT token.
- `DELETE /api/crud/delete:` Delete the authenticated user's account.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js (https://nodejs.org)
- MongoDB (https://www.mongodb.com)

## Installation

1. Clone the repository and navigate to the project directory.
2. Install dependencies using `npm install`.
3. Set up environment variables by creating a `.env` file with the required configuration.

## Authentication

- The API uses JWT (JSON Web Tokens) for user authentication and requires a valid token for accessing protected routes.
- Before accessing any protected endpoints, you need to obtain an authentication token by registering or logging in.

# API DOCUMENTATION

### 1). **Register a new user**
#### Endpoint: `POST /api/crud/register`
#### Description: Register a new user with name, email, and password.

#### Request Body:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "secretpassword",
  "confirmPassword": "secretpassword"
}
```
#### Response:

```json
{
  "success": true,
  "message": "User Registered Successfully",
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```
### 2). **Login**
#### Endpoint: `POST /api/crud/login`
#### Description: Authenticates a user by verifying the provided email and password.

#### Request Body:
```json
{
  "email": "john.doe@example.com",
  "password": "secretpassword"
}
```
#### Response:

```json
{
  "success": true,
  "message": "User Login successful",
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}
```
### 3). **Get User Profile**
#### Endpoint: `GET /api/crud/getuser`
#### Description: Fetches the authenticated user's profile details.
#### Authorization: Requires a valid JWT token obtained during user login.

#### Response:

```json
{
  "success": true,
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}
```
### 4). **Update User Profile**
#### Endpoint: `POST /api/crud/updateuser`
#### Description: Updates the authenticated user's profile (name, email, password).
#### Authorization: Requires a valid JWT token obtained during user login.

#### Request Body:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "newsecretpassword",
  "confirmPassword": "newsecretpassword"
}
```
#### Response:

```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "updatedAt": "timestamp"
  }
}
```
### 5). **Logout**
#### Endpoint: `GET /api/crud/logout`
#### Description: Logs out the authenticated user and invalidates the JWT token.
#### Authorization: Requires a valid JWT token obtained during user login.

#### Response:

```json
{
  "success": true,
  "message": "Logout successful"
}
```
### 6). **Delete User Account**
#### Endpoint: `DELETE /api/crud/delete`
#### Description: Deletes the authenticated user's account and all associated data.
#### Authorization: Requires a valid JWT token obtained during user login.

#### Response:

```json
{
  "success": true,
  "message": "User Deleted Successfully"
}
```
## Error Handling

The API provides appropriate error responses for invalid requests and authentication failures.
#### Example Error Response:
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```
#### Possible Error Messages:
- "all input fields are required"
- "Please provide a valid email id"
- "Password and Confirm password do not match"
- "Account already exists with provided user id"
- "Not authorized"
- "Invalid credentials"
- "User not found"
- "User update failed"
- "Logout failed"
- "User deletion failed"

## Contributing

Contributions are welcome! Please feel free to open a pull request for bug fixes or new features.

## License

This project is licensed under the MIT License.
