import { fetchAllProducts } from '@/api/API'
import Categories from '@/components/Categories'
import ProductCard from '@/components/ProductCard'
import { useEffect, useState } from 'react'

const Home = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await fetchAllProducts();
            console.log(products?.data);
            setProducts(products?.data)
        }
        fetchProducts()
    }, [])

    return (
        <div>
            <Categories />
            <div className='mt-4 flex gap-4'>
                {
                    products?.map((product) => {
                        return <div key={product?.id}>
                            <ProductCard image={import.meta.env.VITE_IMAGE_PATH + product?.attributes?.productImages?.data[0]?.attributes?.url} title={product?.attributes?.title} rating={product?.attributes?.rating} price={product?.attributes?.price}
                            slug={product?.attributes?.slug}
                            />
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Home