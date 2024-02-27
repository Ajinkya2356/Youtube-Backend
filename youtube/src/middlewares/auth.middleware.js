import { apiError } from "../utils/ApiError.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
export const verifyJWT = AsyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new apiError(401, "Unauthorized request");
        }
        const decodedInfo = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );
        const user = await User.findById(decodedInfo?._id).select("-password -refreshToken");
        if (!user) {
            throw new apiError(401, "Invalid access token");
        }
        req.user = user;
        next();
    } catch (error) {
        throw new apiError(401, error?.message || "Invalid access Token")
    }
})