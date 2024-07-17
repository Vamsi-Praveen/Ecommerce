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