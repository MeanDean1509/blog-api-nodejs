# Blog API Documentation

This documentation provides details about the endpoints available in the Blog API.

## Base URL

```
https://blog-api-v3-9ual.onrender.com/
```

## Authentication

Most endpoints require authentication. To authenticate, include the token received after login in the Authorization header:

```
Authorization: Bearer <your_token>
```

---

## User Endpoints

### Register a New User

- **Method:** POST
- **Path:** `/api/v1/users/register`
- **Description:** Creates a new user account
- **Authentication:** Not required

**Request Body:**
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com",
    "isAdmin": false,
    "_id": "60d21b4967d0d8992e610c85",
    "createdAt": "2025-06-21T10:15:23.456Z",
    "updatedAt": "2025-06-21T10:15:23.456Z"
  }
}
```

### User Login

- **Method:** POST
- **Path:** `/api/v1/users/login`
- **Description:** Authenticates a user and provides a token
- **Authentication:** Not required

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com",
    "isAdmin": false,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Get User Profile

- **Method:** GET
- **Path:** `/api/v1/users/profile`
- **Description:** Retrieves the profile of the authenticated user
- **Authentication:** Required

**Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "60d21b4967d0d8992e610c85",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john@example.com",
    "isAdmin": false,
    "followers": [],
    "following": [],
    "blocked": [],
    "posts": [],
    "profilePhoto": "https://cloudinary.com/profile.jpg",
    "createdAt": "2025-06-21T10:15:23.456Z",
    "updatedAt": "2025-06-21T10:15:23.456Z"
  }
}
```

### Get All Users

- **Method:** GET
- **Path:** `/api/v1/users`
- **Description:** Retrieves all users
- **Authentication:** Not required

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "_id": "60d21b4967d0d8992e610c85",
      "firstname": "John",
      "lastname": "Doe",
      "email": "john@example.com"
    },
    {
      "_id": "60d21b4967d0d8992e610c86",
      "firstname": "Jane",
      "lastname": "Smith",
      "email": "jane@example.com"
    }
  ]
}
```

### Delete User Account

- **Method:** DELETE
- **Path:** `/api/v1/users`
- **Description:** Deletes the authenticated user's account
- **Authentication:** Required

**Response:**
```json
{
  "status": "success",
  "data": "Your account has been deleted successfully"
}
```

### Update User Details

- **Method:** PUT
- **Path:** `/api/v1/users`
- **Description:** Updates the authenticated user's profile information
- **Authentication:** Required

**Request Body:**
```json
{
  "firstname": "Johnny",
  "lastname": "Doe",
  "email": "johnny@example.com"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "60d21b4967d0d8992e610c85",
    "firstname": "Johnny",
    "lastname": "Doe",
    "email": "johnny@example.com",
    "updatedAt": "2025-06-21T11:20:45.123Z"
  }
}
```

### Upload Profile Picture

- **Method:** POST
- **Path:** `/api/v1/users/profile-photo-upload`
- **Description:** Uploads or updates the user's profile picture
- **Authentication:** Required

**Request Body:**
- Form data with a file field named "profile"

**Response:**
```json
{
  "status": "success",
  "data": {
    "profilePhoto": "https://cloudinary.com/your-profile-picture.jpg"
  }
}
```

### Update Password

- **Method:** PUT
- **Path:** `/api/v1/users/update-password`
- **Description:** Updates the user's password
- **Authentication:** Required

**Request Body:**
```json
{
  "password": "newSecurePassword"
}
```

**Response:**
```json
{
  "status": "success",
  "data": "Password updated successfully"
}
```

### Follow a User

- **Method:** GET
- **Path:** `/api/v1/users/following/:id`
- **Description:** Follow another user by ID
- **Authentication:** Required
- **URL Parameters:** `id` - ID of the user to follow

**Response:**
```json
{
  "status": "success",
  "data": "You have successfully followed this user"
}
```

### Unfollow a User

- **Method:** GET
- **Path:** `/api/v1/users/unfollow/:id`
- **Description:** Unfollow a user by ID
- **Authentication:** Required
- **URL Parameters:** `id` - ID of the user to unfollow

**Response:**
```json
{
  "status": "success",
  "data": "You have successfully unfollowed this user"
}
```

### Block a User

- **Method:** GET
- **Path:** `/api/v1/users/block/:id`
- **Description:** Block a user by ID
- **Authentication:** Required
- **URL Parameters:** `id` - ID of the user to block

**Response:**
```json
{
  "status": "success",
  "data": "You have successfully blocked this user"
}
```

### Unblock a User

- **Method:** GET
- **Path:** `/api/v1/users/unblock/:id`
- **Description:** Unblock a user by ID
- **Authentication:** Required
- **URL Parameters:** `id` - ID of the user to unblock

**Response:**
```json
{
  "status": "success",
  "data": "You have successfully unblocked this user"
}
```

### Admin Block User

- **Method:** GET
- **Path:** `/api/v1/users/admin-block/:id`
- **Description:** Block a user as an admin
- **Authentication:** Required (Admin only)
- **URL Parameters:** `id` - ID of the user to block

**Response:**
```json
{
  "status": "success",
  "data": "User has been blocked by admin"
}
```

### Admin Unblock User

- **Method:** GET
- **Path:** `/api/v1/users/admin-unblock/:id`
- **Description:** Unblock a user as an admin
- **Authentication:** Required (Admin only)
- **URL Parameters:** `id` - ID of the user to unblock

**Response:**
```json
{
  "status": "success",
  "data": "User has been unblocked by admin"
}
```

### View User Profile

- **Method:** GET
- **Path:** `/api/v1/users/profile-viewer/:id`
- **Description:** Register a view on another user's profile
- **Authentication:** Required
- **URL Parameters:** `id` - ID of the user's profile to view

**Response:**
```json
{
  "status": "success",
  "data": "You have successfully viewed the profile"
}
```

---

## Post Endpoints

### Create a Post

- **Method:** POST
- **Path:** `/api/v1/posts`
- **Description:** Creates a new blog post
- **Authentication:** Required

**Request Body:**
- Form data with fields:
  - `title`: String (required)
  - `description`: String (required)
  - `category`: String (required)
  - `image`: File (optional)

**Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "60d21b4967d0d8992e610c90",
    "title": "Introduction to Node.js",
    "description": "Learn the basics of Node.js programming",
    "category": "60d21b4967d0d8992e610c80",
    "user": "60d21b4967d0d8992e610c85",
    "photo": "https://cloudinary.com/post-image.jpg",
    "createdAt": "2025-06-21T14:25:13.789Z",
    "updatedAt": "2025-06-21T14:25:13.789Z"
  }
}
```

### Get a Specific Post

- **Method:** GET
- **Path:** `/api/v1/posts/:id`
- **Description:** Retrieves a specific post by ID
- **Authentication:** Required
- **URL Parameters:** `id` - ID of the post to retrieve

**Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "60d21b4967d0d8992e610c90",
    "title": "Introduction to Node.js",
    "description": "Learn the basics of Node.js programming",
    "category": {
      "_id": "60d21b4967d0d8992e610c80",
      "title": "Programming"
    },
    "user": {
      "_id": "60d21b4967d0d8992e610c85",
      "firstname": "John",
      "lastname": "Doe"
    },
    "photo": "https://cloudinary.com/post-image.jpg",
    "numViews": 10,
    "likes": [],
    "dislikes": [],
    "comments": [],
    "createdAt": "2025-06-21T14:25:13.789Z",
    "updatedAt": "2025-06-21T14:25:13.789Z"
  }
}
```

### Get All Posts

- **Method:** GET
- **Path:** `/api/v1/posts`
- **Description:** Retrieves all posts
- **Authentication:** Required

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "_id": "60d21b4967d0d8992e610c90",
      "title": "Introduction to Node.js",
      "description": "Learn the basics of Node.js programming",
      "category": "60d21b4967d0d8992e610c80",
      "user": "60d21b4967d0d8992e610c85",
      "photo": "https://cloudinary.com/post-image.jpg",
      "createdAt": "2025-06-21T14:25:13.789Z"
    },
    {
      "_id": "60d21b4967d0d8992e610c91",
      "title": "Express.js Fundamentals",
      "description": "Building APIs with Express.js",
      "category": "60d21b4967d0d8992e610c80",
      "user": "60d21b4967d0d8992e610c85",
      "photo": "https://cloudinary.com/express-image.jpg",
      "createdAt": "2025-06-21T15:30:45.123Z"
    }
  ]
}
```

### Update a Post

- **Method:** PUT
- **Path:** `/api/v1/posts/:id`
- **Description:** Updates an existing post
- **Authentication:** Required (Post author only)
- **URL Parameters:** `id` - ID of the post to update

**Request Body:**
- Form data with fields:
  - `title`: String (optional)
  - `description`: String (optional)
  - `category`: String (optional)
  - `image`: File (optional)

**Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "60d21b4967d0d8992e610c90",
    "title": "Updated Node.js Introduction",
    "description": "Learn the basics of Node.js programming with updates",
    "category": "60d21b4967d0d8992e610c80",
    "user": "60d21b4967d0d8992e610c85",
    "photo": "https://cloudinary.com/updated-post-image.jpg",
    "updatedAt": "2025-06-21T16:45:22.456Z"
  }
}
```

### Delete a Post

- **Method:** DELETE
- **Path:** `/api/v1/posts/:id`
- **Description:** Deletes a post
- **Authentication:** Required (Post author only)
- **URL Parameters:** `id` - ID of the post to delete

**Response:**
```json
{
  "status": "success",
  "data": "Post deleted successfully"
}
```

### Like a Post

- **Method:** GET
- **Path:** `/api/v1/posts/like/:id`
- **Description:** Toggles like on a post (adds like if not liked, removes if already liked)
- **Authentication:** Required
- **URL Parameters:** `id` - ID of the post to like/unlike

**Response:**
```json
{
  "status": "success",
  "data": "You have liked this post"
}
```

### Dislike a Post

- **Method:** GET
- **Path:** `/api/v1/posts/dislike/:id`
- **Description:** Toggles dislike on a post
- **Authentication:** Required
- **URL Parameters:** `id` - ID of the post to dislike/undislike

**Response:**
```json
{
  "status": "success",
  "data": "You have disliked this post"
}
```

---

## Comment Endpoints

### Create a Comment

- **Method:** POST
- **Path:** `/api/v1/comments/:id`
- **Description:** Creates a comment on a post
- **Authentication:** Required
- **URL Parameters:** `id` - ID of the post to comment on

**Request Body:**
```json
{
  "description": "This is a great post! Thanks for sharing."
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "60d21b4967d0d8992e610c95",
    "post": "60d21b4967d0d8992e610c90",
    "user": "60d21b4967d0d8992e610c85",
    "description": "This is a great post! Thanks for sharing.",
    "createdAt": "2025-06-21T17:30:11.123Z",
    "updatedAt": "2025-06-21T17:30:11.123Z"
  }
}
```

### Update a Comment

- **Method:** PUT
- **Path:** `/api/v1/comments/:id`
- **Description:** Updates an existing comment
- **Authentication:** Required (Comment author only)
- **URL Parameters:** `id` - ID of the comment to update

**Request Body:**
```json
{
  "description": "Updated comment: This is an excellent post!"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "60d21b4967d0d8992e610c95",
    "post": "60d21b4967d0d8992e610c90",
    "user": "60d21b4967d0d8992e610c85",
    "description": "Updated comment: This is an excellent post!",
    "updatedAt": "2025-06-21T18:15:33.456Z"
  }
}
```

### Delete a Comment

- **Method:** DELETE
- **Path:** `/api/v1/comments/:id`
- **Description:** Deletes a comment
- **Authentication:** Required (Comment author only)
- **URL Parameters:** `id` - ID of the comment to delete

**Response:**
```json
{
  "status": "success",
  "data": "Comment deleted successfully"
}
```

---

## Category Endpoints

### Create a Category

- **Method:** POST
- **Path:** `/api/v1/categories`
- **Description:** Creates a new category for posts
- **Authentication:** Required

**Request Body:**
```json
{
  "title": "Technology"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "60d21b4967d0d8992e610d00",
    "title": "Technology",
    "user": "60d21b4967d0d8992e610c85",
    "createdAt": "2025-06-21T19:45:22.789Z",
    "updatedAt": "2025-06-21T19:45:22.789Z"
  }
}
```

### Get All Categories

- **Method:** GET
- **Path:** `/api/v1/categories`
- **Description:** Retrieves all categories
- **Authentication:** Not required

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "_id": "60d21b4967d0d8992e610d00",
      "title": "Technology",
      "user": "60d21b4967d0d8992e610c85",
      "createdAt": "2025-06-21T19:45:22.789Z"
    },
    {
      "_id": "60d21b4967d0d8992e610d01",
      "title": "Programming",
      "user": "60d21b4967d0d8992e610c85",
      "createdAt": "2025-06-21T19:46:10.123Z"
    }
  ]
}
```

### Get a Specific Category

- **Method:** GET
- **Path:** `/api/v1/categories/:id`
- **Description:** Retrieves a specific category by ID
- **Authentication:** Not required
- **URL Parameters:** `id` - ID of the category to retrieve

**Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "60d21b4967d0d8992e610d00",
    "title": "Technology",
    "user": "60d21b4967d0d8992e610c85",
    "posts": [
      {
        "_id": "60d21b4967d0d8992e610c90",
        "title": "Introduction to Node.js"
      },
      {
        "_id": "60d21b4967d0d8992e610c91",
        "title": "Express.js Fundamentals"
      }
    ],
    "createdAt": "2025-06-21T19:45:22.789Z",
    "updatedAt": "2025-06-21T19:45:22.789Z"
  }
}
```

### Update a Category

- **Method:** PUT
- **Path:** `/api/v1/categories/:id`
- **Description:** Updates an existing category
- **Authentication:** Required (Category creator only)
- **URL Parameters:** `id` - ID of the category to update

**Request Body:**
```json
{
  "title": "Web Technology"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "60d21b4967d0d8992e610d00",
    "title": "Web Technology",
    "user": "60d21b4967d0d8992e610c85",
    "updatedAt": "2025-06-21T20:30:45.456Z"
  }
}
```

### Delete a Category

- **Method:** DELETE
- **Path:** `/api/v1/categories/:id`
- **Description:** Deletes a category
- **Authentication:** Required (Category creator only)
- **URL Parameters:** `id` - ID of the category to delete

**Response:**
```json
{
  "status": "success",
  "data": "Category deleted successfully"
}
```

---

## Home Endpoint

### Get Home Posts

- **Method:** GET
- **Path:** `/`
- **Description:** Retrieves all posts for the home page
- **Authentication:** Not required

**Response:**
```json
{
  "message": "Success",
  "data": [
    {
      "_id": "60d21b4967d0d8992e610c90",
      "title": "Introduction to Node.js",
      "description": "Learn the basics of Node.js programming",
      "category": "60d21b4967d0d8992e610c80",
      "user": "60d21b4967d0d8992e610c85",
      "photo": "https://cloudinary.com/post-image.jpg",
      "createdAt": "2025-06-21T14:25:13.789Z"
    },
    {
      "_id": "60d21b4967d0d8992e610c91",
      "title": "Express.js Fundamentals",
      "description": "Building APIs with Express.js",
      "category": "60d21b4967d0d8992e610c80",
      "user": "60d21b4967d0d8992e610c85",
      "photo": "https://cloudinary.com/express-image.jpg",
      "createdAt": "2025-06-21T15:30:45.123Z"
    }
  ]
}
```

## Error Responses

When an error occurs, the API will return a response with an appropriate status code and error message:

```json
{
  "status": "error",
  "message": "Error message description"
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Resource created
- `400`: Bad request (client error)
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not found
- `500`: Internal server error
