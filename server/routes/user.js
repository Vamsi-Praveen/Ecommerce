import express from "express";
import { changePassword, createUser, deleteUser, forgotPassword, getAllUsers, getUserById, loginUser, logoutUser, updateUser } from "../controllers/user.js";
import { verifyAuth, verifyPasswordReset } from "../middlewares/verifyAuth.js";

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', createUser)
userRouter.put('/:id', verifyAuth, updateUser)
userRouter.delete('/:id', verifyAuth, deleteUser)
userRouter.post('/login', loginUser)
userRouter.post('/logout', verifyAuth, logoutUser)
userRouter.post('/forgot-password', forgotPassword)
userRouter.post('/reset-password/:token', verifyPasswordReset, changePassword)

export default userRouter;