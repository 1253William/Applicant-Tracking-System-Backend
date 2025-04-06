# Applicant-Tracking-System-Backend
RydeSync ATS is an enterprise-grade Applicant Tracking System designed to help teams streamline the recruitment process. This backend API provides robust support for job management, resume parsing, candidate tracking, and role-based access control (RBAC).

## Features

- User Registration & Authentication (JWT)
- Role-Based Access Control (Recruiter/HR, Candidate)
- Job Posting & Management
- Resume Parsing & Candidate Matching *(WIP)*
- Candidate Pipeline Tracking
- Dashboard & Analytics *(WIP)*
- Resume Upload via Multer
- Email Notifications via Nodemailer

## API Architecture
- RESTful API Design

## Technologies

- **Backend Framework**: Node.js + Express.js, TypeScript
- **Database**: MongoDB
- **Authentication**: JWT + bcrypt
- **Email Service**: Nodemailer
- **File Uploads**: Multer
- **API Documentation**: Swagger 


##  API Endpoints
**Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	User login
GET	/api/auth/me	Get logged-in user

** User Management

**Job Management
Method	Endpoint	Description
POST	/api/jobs	Create a new job
GET	/api/jobs	Get all jobs
GET	/api/jobs/:id	Get single job
PATCH	/api/jobs/:id	Update job
DELETE	/api/jobs/:id	Delete job



**Candidate Tracking Management (candidate routes with Multer for resume upload)
**Resume Parsing Management




Phase 2:
Add Swagger documentation
Set up Multer for resume upload
Implement candidate filtering/search
Add email notifications via Nodemailer