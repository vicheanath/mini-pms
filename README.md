<h1 align="center">
 Mini Property Management System
</h1>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">Property management system website using React js and Spring.</p>
<p align="center"> 
  <a href="https://github.com/vicheanath/mini-pms/actions/workflows/test.yml">
    <img src="https://github.com/vicheanath/mini-pms/actions/workflows/test.yml/badge.svg" />
  </a>
  <a href="https://github.com/vicheanath/mini-pms/actions/workflows/build-push-docker.yml">
    <img src="https://github.com/vicheanath/mini-pms/actions/workflows/build-push-docker.yml/badge.svg" />
  </a>
</p>


## Project Description
This is a mini property management system that allows users to create, read, update and delete properties. It is built with Spring Boot and React.


## Technologies Used
- Backend
  - Spring Boot
  - React
  - PostgreSQL
  - Maven
  - Lombok
  - JPA
  - Hibernate
  - OpenAPI
  - Spring Security
  - JWT
  - Docker
  - Docker Compose
  - ModelMapper
- Frontend
  - React
  - React Bootstrap
  - Axios
  - React Router Dom
  - React Query
  - React Hook Form
  - Redux Toolkit
  - zod (for validation)
  - React Leftlet (for map)

## Features

- Customer Login and Register
- Customer can create, read, update Properties
- Customer can view all properties
- Customer can Search, Sort and Filter properties
- Customer request offer for a property
- Customer can add properties to their favorite list and view them later or remove them from the list
- Owner can view all properties
- Owner can view all offers
- Owner can accept or reject offers
- Admin can view all properties
- Admin can view all offers
- Admin can view all users
- Admin can view all owners
- Admin can view all customers
- Admin access to admin dashboard


## Getting Started
1. Clone the repository

```bash 
git clone https://github.com/vicheanath/mini-pms.git
```

2. Change directory to the project directory

```bash 
cd mini-pms
```

2. Install all dependencies

```bash 
cd frontend && npm install
```

4. Start the backend server
   
```bash 
cd backend/pms
```

 - Run Docker Compose to start the PostgreSQL database
 - ```bash
   docker-compose up -d
   ```
 - Start the Spring Boot server with the following command or run the project in your favorite IDE
 - ```bash
    mvn spring-boot:run
   ```

5. Start the frontend server
```bash
npm start
```

7. Open your browser and navigate to http://localhost:3000

## UserDummy Data

- Admin
  - email:`a@a.com`
  - password: `123`
- Owner
  - email:`b@b.com`
  - password: `123`
- Customer
  - email:`c@c.com`
  - password: `123`

## Usage

## Contributors

<a href="https://github.com/vicheanath/mini-pms/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=vicheanath/mini-pms" />
</a>

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

