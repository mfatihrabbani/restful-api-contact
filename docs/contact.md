# Contact API Spec

## Create Contact API

Endpoint : POST /api/contacts

Headers : 
- Authorization : token

Request Body :

```json
{
    "firstname": "Name",
    "lastname": "Lastname",
    "email": "email@email.com",
    "phone": "08989898982"
}
```

Response Body Success :

```json
{
    "data": {
        "firstname": "Name",
        "lastname": "Lastname",
        "email": "email@email.com",
        "phone": "08989898982"
    }
}
```

Response Body Error :

```json
{
    "errors": "Email is not valid"
}
```

## Update Contact API

Endpoint : PUT /api/contacts

Headers : 
- Authorization : token

Request Body :

```json
{
    "firstname": "Name",
    "lastname": "Lastname",
    "email": "email@email.com",
    "phone": "08989898982"
}
```

Response Body Success :

```json
{
    "data": {
        "id": 1,
        "firstname": "Name",
        "lastname": "Lastname",
        "email": "email@email.com",
        "phone": "08989898982"
    }
}
```

Response Body Error :

```json
{
    "errors": "Email is not valid"
}
```

## Get Contact API

Endpoint : GET /api/contacts/:id

Headers : 
- Authorization : token

Response Body Success :

```json
{
    "data": {
        "id": 1,
        "firstname": "Name",
        "lastname": "Lastname",
        "email": "email@email.com",
        "phone": "08989898982"
    }
}
```

Response Body Error :

```json
{
    "errors": "Contact is not found"
}
```

## Search Contact API

Endpoint : DELETE /api/contacts

Headers : 
- Authorization : token

Query params :
- name : Search by firstname or lastname, using like , optional
- email : Search by email using like, optional
- phone : Search by phone using like, optional
- page : Number of page, default 1
- size per page, default 10

Response Body Success :

```json
{
    "data": [
        {
            "id": 1,
            "firstname": "Name",
            "lastname": "Lastname",
            "email": "email@email.com",
            "phone": "08989898982"
        },
        {
            "id": 2,
            "firstname": "Name",
            "lastname": "Lastname",
            "email": "email@email.com",
            "phone": "08989898982"
        },
        {
            "id": 3,
            "firstname": "Name",
            "lastname": "Lastname",
            "email": "email@email.com",
            "phone": "08989898982"
        },
    ],
    "paging": {
        "page": 1,
        "total_page": 3,
        "total_item": 30
    }
}
```

Response Body Error :
```json
{

}
```

## Remove Contact API

Endpoint : DELETE /api/contacts

Headers : 
- Authorization : token

Response Body Success :

```json
{
    "data": "OK"
}
```

Response Body Error :
```json
{
    "errors": "Contact is not found"
}
```
