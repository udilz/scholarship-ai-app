import express from "express";
import UsersController from "../controllers/users.controller";
import { generateState, generateCodeVerifier } from "arctic";
import { google } from "../utils/arctic";
import UsersRepository from "../repositories/users.repository";
import jwt from "jsonwebtoken";
import { Auth } from "../models/auth.schema";
import config from "../config/config";

export const userRouter = express.Router();
userRouter.get("/all", UsersController.handleGetAllUser);
userRouter.post("/login", UsersController.handleLoginUser);
userRouter.post("/logout", UsersController.handleLogoutUser);
userRouter.post("/register", UsersController.handleRegisterUser);
userRouter.post("/update/:id", UsersController.handleUpdateUser);
userRouter.delete("/delete/:id", UsersController.handleDeleteUser);

userRouter.post("/continue-with-google", async (_, res) => {
   //genereate 2 code challange
   const state = generateState();
   const codeVerifier = generateCodeVerifier();

   // generate authorization url
   const url = await google.createAuthorizationURL(state, codeVerifier, {
      scopes: ["profile", "email"],
   });

   return res.cookie("codeVerifier", codeVerifier).redirect(url.href);
});

userRouter.get("/login/google/callback", async (req, res) => {
   // get from URL
   const code = req.query.code as string;

   // get from cookies
   const { codeVerifier } = req.cookies;

   // check
   if (!code || !codeVerifier) {
      return res.status(400).json({ message: "Invalid code" });
   }

   // validate the code => accesstoken, regreshtoken, accessid, id
   const tokens = await google.validateAuthorizationCode(code, codeVerifier);
   // fetching data from userInfo API endpoint GOOGLE. https://openidconnect.googleapis.com/v1/userinfo
   const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: {
         Authorization: `Bearer ${tokens.accessToken}`,
      },
   });

   //convert to json
   const user = await response.json();

   //login strategy

   //check if user exists
   const findUser = await UsersRepository.findOne(user.email);

   if (!findUser) {
      const newUser = await UsersRepository.createUser({
         name: user.name,
         email: user.email,
         password: "",
         role: "user",
         educational_background: user.educational_background,
         major: user.major,
         funding_need: user.funding_need,
         preference: user.preference,
         onboardingCompleted: true, 
      });

      // generate Session ID
      const payload = {
         id: newUser._id,
         name: newUser.name,
         email: newUser.email,
         role: newUser.role, // Include role in payload
      };
      // Authorization
      const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, { expiresIn: "10m" });
      const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, { expiresIn: "30d" });

      const newRefreshToken = new Auth({
         userId: newUser._id,
         RefreshToken: refreshToken,
      });

      await newRefreshToken.save();
      return res
         .cookie("refreshToken", refreshToken, { httpOnly: true })
         .cookie("accessToken", accessToken)
         .cookie("user", JSON.stringify(payload))
         .status(200)
         .redirect(newUser.role === "admin" ? "http://localhost:5173/dashboard" : "http://localhost:5173/onboarding");
   }

   // generate Session ID
   const payload = {
      id: findUser._id,
      name: findUser.name,
      email: findUser.email,
      role: findUser.role, // Include role in payload
   };
   // Authorization
   const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, { expiresIn: "10m" });
   const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, { expiresIn: "30d" });

   const newRefreshToken = new Auth({
      userId: findUser._id,
      RefreshToken: refreshToken,
   });
   await newRefreshToken.save();
   // Redirect based on onboarding completion
   if (findUser.onboardingCompleted) {
      return res
         .cookie("refreshToken", refreshToken, { httpOnly: true })
         .cookie("accessToken", accessToken)
         .cookie("user", JSON.stringify(payload))
         .status(200)
         .redirect(findUser.role === "admin" ? "http://localhost:5173/dashboard" : "http://localhost:5173/"); // Redirect to prompt page
   } else {
      return res
         .cookie("refreshToken", refreshToken, { httpOnly: true })
         .cookie("accessToken", accessToken)
         .cookie("user", JSON.stringify(payload))
         .status(200)
         .redirect(findUser.role === "admin" ? "http://localhost:5173/dashboard" : "http://localhost:5173/onboarding");
   }
});

