## Setup Environment

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

#### 4. Create Access Token
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

