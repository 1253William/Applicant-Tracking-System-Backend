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
POST /api/v1/auth/signup	Register new user
POST /api/v1/auth/login	User login
GET	/api/v1/auth/me	Get logged-in user(user details)

**Candidate/Applicant/Users Management
Method	Endpoint	Description
GET  /api/v1/candidates   Fetch all Applicants/candidates for  recruiter
GET  /api/v1/candidates/:id Fetch/View an applicant details by id
PUT  /api/v1/candidates/:id  Toggle applicant status as either 'opened' / 'closed' 
DELETE /api/v1/candidates/:id   Delete a candidate application/details from db

**Job Management
Method	Endpoint	Description
POST /api/v1/jobs	Create a new job
GET	/api/v1/jobs	Get all jobs
GET	/api/v1/jobs/:id	Get a single job 
PATCH /api/v1/jobs/:id	Update job
DELETE	/api/v1/jobs/:id	Delete job
POST /api/v1/jobs/applications submit an application on the job portal/page and backend submits and parses resume and details to the db

**Statistics/Metrics for Dashboard Overview
Method	Endpoint	Description
GET /api/v1/dashboard/metrics Fetch 1. total jobs, 2. Total Candidates, 3. Total Positions Filled, 4. Total Employment
GET ////// Weekly trend
GET /////// Monthly trend


**Candidate Tracking Management (candidate routes with Multer for resume upload)
**Resume Parsing Management

Candidate (track each user per application stage, Toggle applicant status ) -> Job Role (Job title, Department, Candidates(UserId), status(open/closed) type(fulltime/part-time) Application stages, we should find: total candidates, in-pipeline, hired, rejected)



Phase 2:
Set up Multer for resume upload
Implement candidate filtering/search
Add email notifications via Nodemailer