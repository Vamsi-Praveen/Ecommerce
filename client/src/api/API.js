import useAuth from "@/hooks/useAuth";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const API = axios.create({
    baseURL: baseURL
})

export const fetchAllProducts = async () => {
    const response = await API.get('/products?populate=*');
    return response?.data;
}

export const fetchProductBySlug = async (slug) => {
    const response = await API.get(`/products?filters[slug][$eq]=${slug}&populate=*`);
    return response?.data?.data
}

export const fetchProductById = async (id) => {
    const response = await API.get(`/products/${id}?populate=*`);
    return response?.data?.data
}

export const getCart = async (userId) => {
    const response = await API.get(`/carts?filters[user][id][$eq]=${userId}&populate[products][populate]=productImages`);
    return response?.data?.data[0]
}

export const loginUser = async ({ email, password }) => {
    const response = await API.post(`/auth/local`, {
        identifier: email,
        password: password
    })
    return response?.data
}

export const validCoupon = async (coupon) => {
    const response = await API.get(`/coupons?filters[code][$eq]=${coupon}&filters[isActive][$eq]=true`)
    return response?.data?.data[0]
}

export const addToCart = async (productId, quantity) => {
    const token = await localStorage.getItem('auth_token')
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(localStorage.getItem('user'))
    if (!user) {
        throw new Error('Not Authroized');
    }
    const userCart = await API.get(`/carts?filters[user][id][$eq]=${user.id}`)

    if (userCart.data.length == 0) {
        //create new cart
        const newCart = await API.post(`/carts`, {
            data: {
                user: user.id,
                items: [{ productId, quantity }]
            }
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (newCart) {
            return newCart.data;
        }
    }
    else {
        const cartId = userCart?.data?.data[0]?.id;
        const cartItems = userCart?.data?.data[0]?.attributes?.items || [];
        const updatedCart = [...cartItems, { productId, quantity }]

        const updateCart = await API.put(`/carts/${cartId}`, {
            data: { items: updatedCart }
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return updateCart?.data
    }
}