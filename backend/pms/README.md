## I. Setup Environment

#### 1. Run Service

(pgAdmin also available port: 5050)

```shell
docker-compose up -d --build
```

---

#### 2. Create DB

```shell
CREATE DATABASE "pms-db";
```

---

#### 3. Member Details

```

- Adimin
   > email: a@a.com
   > password: 123 

- Owner
   > email: b@b.com
   > password: 123

- Customer
   > email: c@c.com
   > password: 123
```

---

#### 4. Open API Documentation

```http://localhost:8080/swagger-ui/index.html```

---

#### 5. Create Access Token

You can paste this in Postman or run in a terminal

```shell
curl --location 'http://localhost:8080/api/v1/auth/token' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "a@a.com",
    "password": "123"
}'
```

response:

```json
{
  "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6W3sicm9sZSI6IkFkbWluIn1dLCJleHAiOjE3MDcwNzYxNjAsImlhdCI6MTcwNzA3NTU2MCwiZW1haWwiOiJhQGEuY29tIn0.rw0kPwa9Jpi8vNgBtej3X4QH0rDN69h1jg-sQtUY4w-sjnjYJSrpMq1S3CKOoiYL8ZWffrvX9b2uSDQNhP4GVw",
  "refreshToken": "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6W3sicm9sZSI6IkFkbWluIn1dLCJleHAiOjE3MDcwNzY3NjEsImlhdCI6MTcwNzA3NTU2MSwiZW1haWwiOiJhQGEuY29tIn0.HmEI79h6_IZBsZDv73kMd6XTcfz5PJBq2WrZPXNXBt1vco-osuq5PiEzDPIAn_KYTVvlb8CSlEybyJMqss8tKQ"
}
```

---

## II. File Service

<br>

#### 1. Upload a Picture API

Request:
```shell
curl --location 'http://localhost:8080/api/v1/files/upload' \
--header 'Content-Type: multipart/form-data' \
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWJqZWN0IjoiQUNDRVNTX1RPS0VOIiwicm9sZXMiOlt7InJvbGUiOiJBZG1pbiJ9XSwiZXhwIjoxNzA3MTgxMDYxLCJpYXQiOjE3MDcxODA0NjEsImVtYWlsIjoiYUBhLmNvbSJ9.NgZm43M-N9aQWi46RoyAM6IDEzIHjo5IMZGMD4s080iWoWre-Z-97RLn4ypETOoSHZ4aenK80Z9azqczOieOAQ' \
--form 'file=@"/C:/Users/dengb/OneDrive/Pictures/logo.PNG"' \
--form 'propertyId="1"'
```

Response
```json
{
    "url": "http://localhost:8080/api/v1/files/47bb02e7-f50d-4b11-b2d1-3d8ffa313ca9/download"
}
```

---

#### 2. Display or Download API

Request:
```shell
curl --location 'http://localhost:8080/api/v1/files/16a1ddc7-b440-4dc7-8b4b-aba60a567d4a/download'
```

---


## III. Email Service

<br>

Enabling mail service `application.yml` file

```yaml
mail:
enabled: ${ENABLED:true}
```


#### 1. Using Email Server for the Internal System

```java
class Application {

    @Autowired EmailService emailService;
    
    public static void main(String[] args) {
        var title = "Hello Everyone";
        var body = "Dear All, How are you?";
        var receiverEmail = "a@a.come";
        
        // Sending an email
        emailService.sendSimpleMail(title, body, receiverEmail);
    }
}

```

<br>

#### 2. Email with API

Request to send an email from frontend

```shell
curl --location 'http://localhost:8080/api/v1/emails/send' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWJqZWN0IjoiQUNDRVNTX1RPS0VOIiwicm9sZXMiOlt7InJvbGUiOiJBZG1pbiJ9XSwiZXhwIjoxNzA3MTgxMDYxLCJpYXQiOjE3MDcxODA0NjEsImVtYWlsIjoiYUBhLmNvbSJ9.NgZm43M-N9aQWi46RoyAM6IDEzIHjo5IMZGMD4s080iWoWre-Z-97RLn4ypETOoSHZ4aenK80Z9azqczOieOAQ' \
--data-raw '{
    "title": "How are you",
    "content": "everyone good",
    "recipient": "a@a.com"
}'
```
