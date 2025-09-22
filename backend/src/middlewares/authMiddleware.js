import jwt from 'jsonwebtoken';

export const authMiddleWare = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        const token = cookies['jwt'];

        if(!token)
        {
            return res.status(403).json({
                message:"Token is Invalid",
            });
        }
        try {
            const decode = await jwt.decode(token);
            req.user = decode;
            console.log("Printing the value of decode ->",decode);
        }
        catch(error)
        {
            console.error("Invalid token",error.message);
            return res.status(403).json({
                message: "Token is Invalid",
            });
        }
        next();
        
    } catch (error) {
        console.error("Error in auth middleware:", error.message);
        res.status(500).send("Internal Server Error");
    }
}