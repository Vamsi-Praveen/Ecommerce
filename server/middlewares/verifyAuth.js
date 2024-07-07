import jwt from "jsonwebtoken"

export const verifyAuth = async (req, res, next) => {
    try {
        const token = req?.cookies?.access_token;
        if (!token) {
            return res.status(401).send({ 'message': "UnAuthorized" });
        }
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

export const verifyPasswordReset = async (req, res, next) => {
    try {
        const { token } = req.params;
        if (!token) {
            return res.status(401).json({ message: "UnAuthorized" });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).send({ error: "Token has expired" });
                } else {
                    return res.status(401).send({ error: "Invalid token" });
                }
            }
            req.user = decoded;
            next();
        });

    } catch (err) {
        console.log(err)
        return res.status(500).send('Internal Server Error');
    }
}