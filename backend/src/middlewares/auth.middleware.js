import { prisma } from "../config/prismaHandler.js"
import { asyncHandler } from "../utils/asyncHandler.util.js"
import ApiError from "../utils/ErrorHandler.util.js"
import jwt from 'jsonwebtoken'

const verifyJWT = asyncHandler(async(req, res, next)=>{
    try {
        const accessToken = req.cookies.accessToken
        if(!accessToken){
            throw new ApiError(`Session Expired . Please login`, 401);
        }

        const decodedToken = await jwt.verify(accessToken , process.env.ACCESSTOKEN_SECRET);

        const user = await prisma.user.findUnique({
            where :{
                id : decodedToken.id
            },
            select : {
                id : true,
                userName :true,
                email : true
            }
        })

        if(!user){
            throw new ApiError(`Account not found please verify credentials`, 404)
        }

        req.user = user;

        next();
        

    } catch (error) {
        console.error(`Error in verifying the JWT`,error.message)
        throw new ApiError('Unauthorized Access', 500);
    }
})


export {
    verifyJWT
}