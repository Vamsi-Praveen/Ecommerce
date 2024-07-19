import axios from "axios"

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