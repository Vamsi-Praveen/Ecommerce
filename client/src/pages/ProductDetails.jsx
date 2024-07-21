import { fetchProductBySlug } from '@/api/API';
import { icons } from '@/assets';
import CountIncreaseButton from '@/components/CountIncreaseButton';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom'

const ProductDetails = () => {

    const { slug } = useParams();
    const [product, setProduct] = useState([])
    const navigate = useNavigate()
    const [mainImage, setMainImage] = useState(null)

    useEffect(() => {

        if (!slug) navigate('/')

        const fetchProduct = async () => {
            const product = await fetchProductBySlug(slug);
            setProduct(product[0])
            setMainImage(product[0]?.attributes?.productImages?.data[0]?.attributes?.url)
        }
        fetchProduct()
    }, [])

    return (
        <>
            <Helmet>
                <title>{`Buy ${product?.attributes?.title}`}</title>
            </Helmet>
            <div className='py-10 flex gap-10 flex-col md:flex-row'>
                <div className='flex gap-8 md:flex-row flex-col-reverse'>
                    <div className='space-x-3 md:space-x-0 md:space-y-3 flex md:flex-col flex-row'>
                        {
                            product?.attributes?.productImages?.data.map((image) => {
                                return <img src={import.meta.env.VITE_IMAGE_PATH + image?.attributes?.url} className={`w-[100px] h-[100px] cursor-pointer ${image?.attributes?.url === mainImage && 'border-2'} border-primaryRed object-cover`} onClick={() => setMainImage(image?.attributes?.url)} />
                            })
                        }
                    </div>
                    <img alt='Product Image' src={import.meta.env.VITE_IMAGE_PATH + mainImage} className='h-[400px] md:w-[400px] object-contain transition' />
                </div>
                <div className='flex-1 space-y-1'>
                    <h1 className='text-xl font-medium tracking-tight'>{product?.attributes?.title}</h1>
                    <div className='flex'>
                        {Array(5).fill(false).map((_, i) => {
                            return <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={`${product?.attributes?.rating > i ? '#FFAD33' : '#F5F5F5'}`} xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.8284 9.93621C20.4517 9.93621 20.7176 10.7286 20.2205 11.1046L16.8905 13.6234C16.1688 14.1693 15.8661 15.1087 16.1334 15.9732L17.3864 20.0261C17.5735 20.6312 16.8729 21.1193 16.3701 20.7341L13.3075 18.3879C12.536 17.7969 11.464 17.7969 10.6925 18.3879L7.61357 20.7466C7.11152 21.1312 6.41161 20.645 6.59677 20.0403L7.83243 16.0046C8.09532 15.146 7.79694 14.2145 7.08413 13.6684L3.73432 11.1022C3.24111 10.7244 3.50831 9.93621 4.12961 9.93621H8.12744C9.07024 9.93621 9.90305 9.32198 10.1815 8.42125L11.379 4.5479C11.5678 3.93721 12.4322 3.93722 12.621 4.5479L13.8185 8.42124C14.0969 9.32198 14.9298 9.93621 15.8726 9.93621H19.8284Z" stroke={`${product?.attributes?.rating > i ? '#FFAD33' : '#F5F5F5'}`} stroke-width="1.5" />
                            </svg>
                        })}
                    </div>
                    <div className='pb-3 border-b'>
                        <span className='text-primaryRed font-semibold mt-1 text-lg'>₹{product?.attributes?.price}</span>
                        <p className='text-sm text-justify text-[#7D8184]'>{product?.attributes?.description}</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <CountIncreaseButton />
                        <Button variant="primary">Buy Now</Button>
                        <Button variant="ghost" className="border hover:bg-primaryRed group px-1.5">
                            <img alt='wishlist' src={icons.favorite} className='group-hover:invert transition-colors' />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetails
