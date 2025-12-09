# NexusCare API Testing Guide - Postman Collection

## Import Instructions

1. Open Postman
2. Click "Import" button
3. Select "Raw text"
4. Paste the JSON below
5. Click "Import"

## Postman Collection JSON

```json
{
  "info": {
    "name": "NexusCare API",
    "description": "Complete API collection for NexusCare platform",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Authentication",
      "item": [
        {
          "name": "Register User",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"username\": \"testuser\",\n  \"email\": \"test@example.com\",\n  \"password\": \"password123\",\n  \"full_name\": \"Test User\",\n  \"phone\": \"+1234567890\",\n  \"role\": \"Resident\"\n}"
            },
            "url": {
              "raw": "http://localhost:5000/api/register",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "register"]
            }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"username\": \"admin\",\n  \"password\": \"admin123\"\n}"
            },
            "url": {
              "raw": "http://localhost:5000/api/login",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "login"]
            }
          }
        },
        {
          "name": "Check Session",
          "request": {
            "method": "GET",
            "url": {
              "raw": "http://localhost:5000/api/session",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "session"]
            }
          }
        },
        {
          "name": "Logout",
          "request": {
            "method": "POST",
            "url": {
              "raw": "http://localhost:5000/api/logout",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "logout"]
            }
          }
        }
      ]
    },
    {
      "name": "Complaints",
      "item": [
        {
          "name": "Get All Complaints",
          "request": {
            "method": "GET",
            "url": {
              "raw": "http://localhost:5000/api/complaints",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "complaints"]
            }
          }
        },
        {
          "name": "Get Single Complaint",
          "request": {
            "method": "GET",
            "url": {
              "raw": "http://localhost:5000/api/complaints/1",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "complaints", "1"]
            }
          }
        },
        {
          "name": "Create Complaint",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"Test Complaint\",\n  \"description\": \"This is a test complaint for API testing\",\n  \"category\": \"Maintenance\",\n  \"priority\": \"High\"\n}"
            },
            "url": {
              "raw": "http://localhost:5000/api/complaints",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "complaints"]
            }
          }
        },
        {
          "name": "Update Complaint",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"Updated Complaint Title\",\n  \"description\": \"Updated description\",\n  \"status\": \"In Progress\"\n}"
            },
            "url": {
              "raw": "http://localhost:5000/api/complaints/1",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "complaints", "1"]
            }
          }
        },
        {
          "name": "Delete Complaint",
          "request": {
            "method": "DELETE",
            "url": {
              "raw": "http://localhost:5000/api/complaints/1",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "complaints", "1"]
            }
          }
        }
      ]
    },
    {
      "name": "Admin",
      "item": [
        {
          "name": "Get All Users",
          "request": {
            "method": "GET",
            "url": {
              "raw": "http://localhost:5000/api/admin/users",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "admin", "users"]
            }
          }
        },
        {
          "name": "Get System Stats",
          "request": {
            "method": "GET",
            "url": {
              "raw": "http://localhost:5000/api/admin/stats",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "admin", "stats"]
            }
          }
        }
      ]
    }
  ]
}
```

## Testing Workflow

### 1. Setup Postman

1. Enable cookie handling:
   - Settings → General → Cookies → "Automatically follow redirects"
   - Settings → General → "Automatically follow redirects" ON

2. Create environment (optional):
   - Variable: `base_url`
   - Value: `http://localhost:5000/api`

### 2. Test Authentication Flow

**Step 1: Register a new user**
- Use "Register User" request
- Modify username/email to be unique
- Expected: 201 Created

**Step 2: Login**
- Use "Login" request
- Use credentials from registration
- Expected: 200 OK with user data
- **Important**: Session cookie will be stored automatically

**Step 3: Check Session**
- Use "Check Session" request
- Expected: 200 OK with authenticated: true

### 3. Test Complaint CRUD

**Create:**
- Use "Create Complaint" request
- Must be logged in first
- Expected: 201 Created

**Read:**
- Use "Get All Complaints"
- Expected: 200 OK with array of complaints

**Update:**
- Use "Update Complaint"
- Change complaint ID in URL
- Expected: 200 OK

**Delete:**
- Use "Delete Complaint"
- Change complaint ID in URL
- Expected: 200 OK

### 4. Test Admin Endpoints

**Login as Admin first:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

Then test:
- Get All Users
- Get System Stats

### 5. Test Authorization

**Test 1: Unauthorized Access**
- Logout first
- Try to access "Get All Complaints"
- Expected: 401 Unauthorized

**Test 2: Forbidden Access**
- Login as Resident
- Try to access "Get All Users"
- Expected: 403 Forbidden

## Manual Testing Checklist

### Authentication
- [ ] Can register new user
- [ ] Cannot register with duplicate username
- [ ] Cannot register with duplicate email
- [ ] Can login with valid credentials
- [ ] Cannot login with invalid credentials
- [ ] Session persists across requests
- [ ] Can logout successfully

### Complaints (Resident)
- [ ] Can create complaint
- [ ] Can view own complaints
- [ ] Can update own complaint
- [ ] Can delete own complaint
- [ ] Cannot view other users' complaints
- [ ] Cannot update other users' complaints

### Complaints (Admin)
- [ ] Can view all complaints
- [ ] Can update any complaint
- [ ] Can change complaint status
- [ ] Can delete any complaint

### Admin Panel
- [ ] Admin can access admin endpoints
- [ ] Non-admin cannot access admin endpoints
- [ ] Stats are calculated correctly
- [ ] User list shows all users

### Error Handling
- [ ] 404 for non-existent resources
- [ ] 401 for unauthorized access
- [ ] 403 for forbidden access
- [ ] 400 for invalid data
- [ ] 500 errors are logged

## Common Test Scenarios

### Scenario 1: Complete User Journey

1. Register as new resident
2. Login
3. Create 3 complaints with different priorities
4. Update one complaint
5. Delete one complaint
6. View remaining complaints
7. Logout

### Scenario 2: Admin Workflow

1. Login as admin
2. View all users
3. View system statistics
4. View all complaints
5. Update complaint status to "In Progress"
6. Update complaint status to "Resolved"

### Scenario 3: Security Testing

1. Try accessing protected routes without login
2. Try accessing admin routes as resident
3. Try updating another user's complaint
4. Verify session expires after timeout

## Expected Response Examples

### Successful Login
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@nexuscare.com",
    "role": "Admin",
    "full_name": "System Administrator"
  }
}
```

### Get Complaints
```json
{
  "complaints": [
    {
      "id": 1,
      "title": "Broken elevator",
      "description": "Elevator not working",
      "category": "Maintenance",
      "priority": "High",
      "status": "Open",
      "created_at": "2024-12-09T10:00:00",
      "username": "resident1"
    }
  ]
}
```

### Error Response
```json
{
  "error": "Unauthorized access",
  "code": 401
}
```

---

**Happy Testing! 🧪**
