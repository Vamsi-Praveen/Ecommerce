import { fetchProductById, getCart } from "@/api/API";
import useAuth from "@/hooks/useAuth";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartItems, setCartItems] = useState(0);
    const { user } = useAuth();
    const [cartWithProduct, setCartWithProduct] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            if (!user?.id) return;

            try {
                const userCart = await getCart(user.id);

                const items = userCart?.attributes?.items || [];
                const productPromises = items.map(item => fetchProductById(item.productId));
                const products = await Promise.all(productPromises);

                const cartWithProductData = items.map((item, index) => ({
                    ...item,
                    productData: products[index],
                }));

                const cartData = {
                    cartId: userCart?.id,
                    items: cartWithProductData,
                }

                setCart(userCart?.attributes?.products?.data || []);
                setCartItems(userCart?.attributes?.items?.length || 0);
                setCartWithProduct(cartData);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
    }, [user]);

    return (
        <CartContext.Provider value={{ cart, setCart, cartItems, setCartItems, cartWithProduct }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
