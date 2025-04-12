# KL Job Portal

A comprehensive job portal application with a Java Spring Boot backend and React frontend. This platform allows job seekers to find opportunities, employers to post job listings, and administrators to manage the system.

## Technologies Used

### Backend

- **Java Spring Boot**: Core framework
- **Spring Data JPA**: Database operations
- **MySQL**: Database
- **JWT**: Authentication
- **Spring Mail**: Email services for password recovery

### Frontend

- **React**: UI library
- **Vite**: Build tool
- **React Router**: Navigation
- **CSS**: Styling

## Project Structure

- **Backend/JobPortalS21**: Java Spring Boot application
- **Frontend/JobPortalS21**: React frontend application

## Setup Instructions

### Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- MySQL 8.0 or higher
- Node.js 16 or higher
- npm 8 or higher

### Initial Configuration

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/kl-job-portal.git
   cd kl-job-portal
   ```

2. **Database Setup**:

   - Create a MySQL database:
     ```sql
     CREATE DATABASE JobPortalS21;
     ```
   - Create a database user (optional but recommended):
     ```sql
     CREATE USER 'jobportaluser'@'localhost' IDENTIFIED BY 'your_password';
     GRANT ALL PRIVILEGES ON JobPortalS21.* TO 'jobportaluser'@'localhost';
     FLUSH PRIVILEGES;
     ```

3. **Application Properties**:
   - Navigate to the backend resources directory:
     ```bash
     cd Backend/JobPortalS21/src/main/resources
     ```
   - Copy the example properties file:
     ```bash
     cp application.properties.example application.properties
     ```
   - Edit `application.properties` with your database credentials and email settings

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd Backend/JobPortalS21
   ```

2. Build the project using Maven:

   ```bash
   mvn clean install
   ```

3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
   The backend will start on http://localhost:8080

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:

   ```bash
   cd Frontend/JobPortalS21
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will start on http://localhost:5173

## Features

### Authentication & Authorization

- User registration with email verification
- Secure login with JWT token authentication
- Password recovery via email
- Role-based access control

### User Roles

- **Admin**: Full system access, user management, and job approval
- **Employee**: Post and manage job listings on behalf of their company
- **Job Seeker**: Search for jobs, apply to positions, and manage applications

### Job Management

- Create, read, update, and delete job postings
- Search jobs by skills, location, and other criteria
- Filter jobs by type (Full-time, Part-time, Contract, etc.)

### User Interface

- Dynamic menu system based on user roles
- Responsive design for desktop, tablet, and mobile devices
- Intuitive job posting and application process

## Security Notes

- The application uses JWT tokens for authentication
- Sensitive configuration (database credentials, email passwords) should not be committed to version control
- Always use the provided example files and configure your local environment separately

## Development Notes

- This project structure has been cleaned up to only include the necessary files for the KL Job Portal application
- The backend is configured to output compiled classes to its own target directory, preventing the creation of unnecessary directories in the root
- Frontend is built with React and uses Vite as the build tool

## Deployment

### Backend Deployment

1. Build the application using Maven:

   ```bash
   cd Backend/JobPortalS21
   mvn clean package
   ```

2. The built WAR file will be in the `target` directory and can be deployed to any Java servlet container like Tomcat or deployed as a standalone application:
   ```bash
   java -jar target/JobPortalS21-0.0.1-SNAPSHOT.war
   ```

### Frontend Deployment

1. Build the frontend for production:

   ```bash
   cd Frontend/JobPortalS21
   npm run build
   ```

2. The built files will be in the `dist` directory and can be served by any static file server or CDN

## Contributing

Contributions to the KL Job Portal project are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

### Coding Standards

- Follow Java code conventions for the backend
- Use functional components and hooks for new React components
- Write clear commit messages
- Update documentation as needed

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright © 2025 Leo Stephen - K L University
