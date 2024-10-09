import express from "express";
import ScholarshipController from "../controllers/scholarship.controller";

export const scholarshipRouter = express.Router();

// method to get all scholarships
scholarshipRouter.get("/", ScholarshipController.handleGetAllScholarships);

// method to create new scholarship
scholarshipRouter.post("/", ScholarshipController.handleCreateScholarship);

// method to update a scholarship
scholarshipRouter.put("/:id", ScholarshipController.handleUpdateScholarship);

//getByd
scholarshipRouter.get("/:id", ScholarshipController.handleGetById);

// method to delete a scholarship
scholarshipRouter.delete("/:id", ScholarshipController.handleDeleteScholarship);

scholarshipRouter.post("/search", ScholarshipController.handleGetData);