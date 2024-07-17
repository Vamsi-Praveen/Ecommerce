import { fetchProductBySlug } from '@/api/API';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ProductDetails = () => {

    const { slug } = useParams();
    const [product, setProduct] = useState([])
    const navigate = useNavigate()

    useEffect(() => {

        if (!slug) navigate('/')

        const fetchProduct = async () => {
            const product = await fetchProductBySlug(slug);
            setProduct(product)
        }
        fetchProduct()
    }, [])
    return (
        <div>
            {
                product[0]?.attributes?.productImages?.data.map((image) => {
                    return <img src={import.meta.env.VITE_IMAGE_PATH + image?.attributes?.url} />
                })
            }
        </div>
    )
}

export default ProductDetails
