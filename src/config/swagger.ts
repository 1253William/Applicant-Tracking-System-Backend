import swaggerJSDoc from "swagger-jsdoc";

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Applicant Tracking System Backend API",
            version: "1.0.0",
            description: "RydeSync ATS is an enterprise-grade Applicant Tracking System designed to help teams streamline the recruitment process. This backend API provides robust support for job management, resume parsing, candidate tracking, and role-based access control (RBAC).",
        },
          contact: {
              name: "William Ofosu Parwar",
              title: "Project Maintainer: Senior Software Backend Engineer",
                url: "https://williamofosuparwar.vercel.app/",
                email: "williamofosu677@gmail.com",
            },
            license: {
                name: "MIT License",
                url: "https://github.com/1253William/Applicant-Tracking-System-Backend?tab=MIT-1-ov-file#readme",
            },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Development server",
            },
             {
                url: "https://applicant-tracking-system-backend-aqpr.onrender.com",
                description: "Live server"
            }
        ],
    },
    apis: ["src/routes/*.ts"],
}

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;

