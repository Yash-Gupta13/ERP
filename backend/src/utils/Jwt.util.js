import { prisma } from "../config/prismaHandler.js"
import jwt from 'jsonwebtoken';
import ApiError from "./ErrorHandler.util.js";

const generateAccessAndRefreshToken = async (id) => {
    try {
        const userDetail = await prisma.user.findUnique({
            where: {
                id
            }
        })
    
        const accessToken = await generateAccessToken(userDetail);
        const refreshToken = await generateRefreshToken(userDetail);
    
        await prisma.user.update({
            where : {
                id
            },
            data:{
                refreshToken
            }
        })
    
        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error generating tokens:", error);
        throw new ApiError("Error generating tokens", 500);
    }
}

const generateAccessToken = async (userDetail) => {
    const { id, email, userName } = userDetail;

    return await jwt.sign({
        id: id,
        email: email,
        userName: userName
    },
        process.env.ACCESSTOKEN_SECRET
        , {
            expiresIn: process.env.ACCESSTOKEN_EXPIRY
        }
    )
}

const generateRefreshToken = async (userDetail) => {
    const { id } = userDetail;

    return await jwt.sign({
        id: id
    },
        process.env.REFRESHTOKEN_SECRET
        , {
            expiresIn: process.env.REFRESHTOKEN_EXPIRY
        }
    )
}




export {
    generateAccessAndRefreshToken
}