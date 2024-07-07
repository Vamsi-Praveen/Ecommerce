import jwt from "jsonwebtoken";

export const generateToken = async (res, user) => {
    const token = jwt.sign({ id: user?._id, email: user?.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
    });
}
