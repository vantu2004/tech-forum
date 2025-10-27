import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tech Forum API",
      version: "1.0.0",
      description: "API documentation for Tech Forum (with JWT Authentication)",
    },
    servers: [
      {
        url: "http://localhost:5000", // hoặc domain của bạn
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Nhập token JWT vào đây. Ví dụ: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"], // nơi swagger quét các mô tả
};


const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
