# mini-pms


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
`git clone `

2. Change directory to the project directory
`cd mini-pms`

3. Install all dependencies
`cd frontend && npm install`

4. Start the backend server
`cd backend `

 - Run Docker Compose to start the PostgreSQL database
 - `docker-compose up -d`
 - Start the Spring Boot server with the following command or run the project in your favorite IDE
 - `mvn spring-boot:run`

5. Start the frontend server
`npm start`

6. Open your browser and navigate to http://localhost:3000

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

