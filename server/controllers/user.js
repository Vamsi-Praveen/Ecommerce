import expressAsyncHandler from "express-async-handler";
import User from '../models/user.js';
import { generateToken } from "../utils/generateToken.js";
import { generateUserForgotPasswordLink } from "../utils/generateFPLink.js";
import { sendForgotPasswordMail } from "../utils/sendFPLink.js";

export const getAllUsers = expressAsyncHandler(
    async (req, res) => {
        const allUsers = await User.find();
        res.status(200);
        res.json({
            result: {
                data: allUsers
            }
        })
    }
)

export const getUserById = expressAsyncHandler(
    async (req, res) => {
        const userID = req.params?.id;
        if (!userID) {
            res.status(400);
            throw new Error("User ID required");
        }
        const fetchedUser = await User.findById(userID);
        if (!fetchedUser) {
            res.status(404);
            throw new Error("No User Found");
        }
        res.status(200).send(
            {
                results: {
                    data: fetchedUser
                }
            }
        )
    }
)

export const createUser = expressAsyncHandler(
    async (req, res) => {
        const { firstName, lastName, email, password, phoneNumber } = req.body;
        const isExist = await User.findOne({ email: email });
        if (isExist) {
            res.status(402);
            throw new Error('User already exists');
        }
        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
            phoneNumber
        })
        res.status(200)
        res.json({
            result: {
                message: 'User Created Successfull',
                email: user.email
            }
        })
    }
)

export const loginUser = expressAsyncHandler(
    async (req, res) => {
        const { email, password } = req.body;
        if (!email && !password) {
            res.status(400);
            throw new Error("Incorrect Data format");
        }
        const validUser = await User.findOne({ email: email })
        if (!validUser) {
            res.status(404);
            throw new Error("User Not Found");
        }
        if (!(await validUser.checkPassword(password))) {
            res.status(400);
            throw new Error("Invalid Password");
        }
        generateToken(res, validUser);
        res.status(200);
        res.json({
            data: {
                email: validUser.email,
                state: "Logged in",
            },
        });
        return;
    }
)

export const updateUser = expressAsyncHandler(
    async (req, res) => {
        const userId = req?.params?.id;
        const { name, email, phoneNumber, cart, wishlist, addresses } = req.body;
        const validUser = await User.findById(userId);

        if (!validUser) {
            res.status(404)
            throw new Error("No User Found");
        }
        const updatedCart = cart ? [...validUser.cart, ...cart] : validUser.cart;
        const updatedWishlist = wishlist ? [...validUser.wishList, ...wishlist] : validUser.wishList;
        const updatedAddresses = addresses ? [...validUser.addresses, ...addresses] : validUser.addresses;

        const isUpdated = await User.findByIdAndUpdate(userId, {
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            cart: updatedCart,
            wishlist: updatedWishlist,
            addresses: updatedAddresses
        }, { new: true })

        if (!isUpdated) {
            res.status(500);
            throw new Error("User update Failed");
        }
        res.status(200);
        res.json({
            data: {
                email: isUpdated.email,
                update: true,
            },
        });
        return;
    }
)

export const deleteUser = expressAsyncHandler(
    async (req, res) => {
        const userId = req?.params?.id;
        const validUser = await User.findById(userId);
        if (!validUser) {
            res.status(404);
            throw new Error("No User Found");
        }
        const deletedUser = await validUser?.deleteOne();
        if (!deletedUser) {
            res.status(400)
            throw new Error('User Deletion Failed');
        }
        res.status(200).send({ result: { 'message': 'Deleted Successfull', email: validUser?.email } });
    }
)

export const logoutUser = expressAsyncHandler(
    async (_, res) => {
        res.clearCookie('access_token', {
            httpOnly: true,
            sameSite: 'strict'
        }).status(200).send({ result: { 'message': 'Logout Successfull' } })

    }
)

export const forgotPassword = expressAsyncHandler(
    async (req, res) => {
        const { email } = req.body;
        const validUser = await User.findOne({ email: email });
        if (!validUser) {
            res.status(404)
            throw new Error("User Not Found")
        }
        const link = generateUserForgotPasswordLink(validUser);
        sendForgotPasswordMail(validUser?.email, link);
        res.status(200).json({
            data: {
                status: "Email sent successfully",
            },
        })
    }
)


export const changePassword = expressAsyncHandler(
    async (req, res) => {
        const { token, password, verify_password } = req.body;
        if (!token) {
            throw new Error("Token does not exist");
        }
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (e) {
            res.status(400);
            throw new Error("Invalid token");
        }
        if (verify_password !== password) {
            res.status(400);
            throw new Error("Please re verify the password");
        }
        const userId = decoded.userId;
        const user = await User.findByIdAndUpdate(userId, {
            password: password,
        });
        res.json({
            data: {
                email: user?.email,
                update: true,
            },
        });
    }
);

export const addItemToCart = expressAsyncHandler(
    async (req, res) => {
        const { product } = req.body;
        const { id } = req.user;
        if (!id) {
            res.status(400);
            throw new Error("User Id required");
        }
        if (!product) {
            res.status(400);
            throw new Error("Product is required");
        }
        const user = await User.findById(id);
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }
        const cartItems = [...user.cartItems, product];
        const updatedUser = await User.findByIdAndUpdate(id, { cartItems }, { new: true });
        if (!updatedUser) {
            res.status(500);
            throw new Error('Added to Cart failed');
        }
        res.status(200).json({
            result: {
                data: {
                    email: updatedUser.email,
                    added: true,
                    cartItems: updatedUser.cartItems
                }
            }
        });
        return;
    }
)

export const deleteCartItem = expressAsyncHandler(
    async (req, res) => {
        const { productId } = req.params;
        if (!productId) {
            res.status(400);
            throw new Error('Product Id is required');
        }
        const { id } = req.user;
        if (!id) {
            res.status(400);
            throw new Error("User Id required");
        }
        const user = await User.findById(id);
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }
        const cartItems = user?.cartItems.filter((product) => product.id != productId);
        const updatedUser = await User.findByIdAndUpdate(id, { cartItems }, { new: true });
        if (!updatedUser) {
            res.status(500);
            throw new Error('Failed to delete cart item.');
        }
        res.status(200).json({
            result: {
                data: {
                    email: updatedUser.email,
                    deleted: true,
                    cartItems: updatedUser.cartItems
                }
            }
        });
        return;
    }
)
