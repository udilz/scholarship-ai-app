import type { Request, Response } from "express";
import UsersServices from "../services/users.services";
import { IUser } from "../types/users.type";


const UserController = {
   handleGetAllUser: async (_: Request, res: Response) => {
      const allUsers = await UsersServices.getAll();
      return res.json({ data: allUsers });
   },

   handleLoginUser: async (req: Request, res: Response) => {
      const { email, password } = req.body;
      const loginUser = await UsersServices.loginUser(email, password);
      // console.log(loginUser);

      if (!loginUser) {
         return res.json({ message: "Invalid email or password" });
      }

      const { accessToken, refreshToken } = loginUser;

      return res
         .status(200)
         .cookie("accessToken", accessToken, { httpOnly: true })
         .cookie("refreshToken", refreshToken, { httpOnly: true })
         .json({ message: "success login", token: loginUser });
   },

   handleLogoutUser: async (req: Request, res: Response) => {
      const { refreshToken } = req.cookies;
      // console.log(refreshToken);
      
      if (!refreshToken) {
         return res.json({ message: "Invalid token" });
      }
      const token = await UsersServices.logoutUser(refreshToken);
      // console.log(token);
      if (!token) {
         return res.json({ message: "Invalid token" });
      }
      // // console.log(RefreshToken);
      // return res.json({ message: token });
      return res.clearCookie("accessToken").clearCookie("refreshToken").status(200).json({ message: "Logout success" });
   },

   handleRegisterUser: async (req: Request, res: Response) => {
      const requiredFields = ["name", "email", "password"];
      for (const field of requiredFields) {
         if (!req.body[field]) {
            return res.status(400).json({ error: `The ${field} field is required.` });
         }
      }

      try {
         const newUser: IUser = req.body;
         const registeredUser = await UsersServices.registerUser(newUser);
         return res.status(201).json({
            message: "User registered successfully",
            data: { _id: registeredUser._id },
         });
      } catch (error) {
         return res.status(500).json({
            error: "Failed to register the user",
            details: error instanceof Error ? error.message : "An unknown error occurred",
         });
      }
   },

   handleUpdateUser: async (req: Request, res: Response) => {
      // const header = req.headers.authorization;
      const userID = req.params.id;
      // // updating a scholarship requires authorization
      // if (header !== "123123") {
      // return res.status(401).json({
      // message: "Unauthorized",
      // });
      // }
      try {
         // business logic to update a scholarship
         // Call the service to update the scholarship
         const updateUser = await UsersServices.updateUser(userID, req.body);
         

         if (!updateUser) {
            return res.status(404).json({ message: "User not found" });
         }
         // return response
         return res.json({ message: "User updated successfully", updateUser });
      } catch (error) {
         return res.status(500).json({
            error: "Server error",
            details: error instanceof Error ? error.message : "An unknown error occurred",
         });
      }
   },
   handleDeleteUser: async (req: Request, res: Response) => {
      const userID = req.params.id;

      try {
         const deletedResult = await UsersServices.deleteUser(userID);
         if (!deletedResult) {
            return res.status(404).json({ error: "User not found" });
         }
         // Return Success response
         return res.status(200).json({ message: "User deleted successfully", data: { _id: deletedResult._id } });
      } catch (error) {
         const typedError = error as Error;
         return res.status(500).json({ message: typedError.message || "Server error", error: "failed to delete data" });
      }
   },
};

export default UserController;
