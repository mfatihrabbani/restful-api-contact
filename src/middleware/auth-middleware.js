import { prismaClient } from "../application/database.js"
import { logger } from "../application/logging.js"

export const authMiddleware = async (req, res , next) => {
    const token = req.get('Authorization')
    logger.error("token auth ", token)
    if(!token){
        res.status(401).json({
            errors: "Unauthorized"
        }).end()
    }else{
        const user = await prismaClient.user.findFirst({
            where: {
                token: token
            }
        })
        if(!user){
            res.status(401).json({
                errors: "Unauthorized"
            }).end() 
        }else{
            req.user = user
            next()
        }
    }
}