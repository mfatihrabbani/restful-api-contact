# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body :
```json
{
    "username" : "joko",
    "password" : "passwordJoko",
    "name": "Joko Sulandoko"
}
```

Response Body Success :

```json
{
    "data": {
        "username": "joko",
        "name": "Joko Sulandoko"
    }
}
```

Response Body Error :

```json
{
    "errors": "Username already used"
}
```

## Login User API

Endpoint : POST /api/users/login

Response Body :

```json
{
    "username": "joko",
    "password": "passwordJoko"
}
```

Reponse Body Success :

```json
{
    "data" : {
        "token": "unique-token"
    }
}
```

Response Body Error :

```json
{
    "errors": "username or password wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers :
- Authorization  : token

Request Body :
```json
{
    "name": "New Joko Sulandoko",
    "password" : "new Joko"
}
```

Response Body Success

```json
{
    "data": {
        "username": "Joko",
        "name": "New Joko Sulandoko"
    }
}
```

Response Body Error :

```json
{
    "errors": "Name length max 100"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers :
- Authorization  : token

Response Body Success :

```json
{
    "data": {
        "username": "joko",
        "name": "Joko Sulandoko"
    }
}
```

Response Body Error :

```json
{
    "errors": "Unauthorizated"
}
```

## Logout User API

Endponint : DELETE /api/users/logout

Headers :
- Authorization  : token

Response Body Success :
```json
{
    "data" : "OK"
}
```

Respone Body Error :
```json
{
    "errors": "Unauthorized"
}
```