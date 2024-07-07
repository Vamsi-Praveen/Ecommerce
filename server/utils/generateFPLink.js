import jwt from "jsonwebtoken"

export function generateUserForgotPasswordLink(user) {
    const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "10m" }
    );
    const link = `http://localhost:3000/reset-password/${token}`;
    return link;
}
