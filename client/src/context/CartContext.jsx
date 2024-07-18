import { createContext, useState } from "react";

export const CartContext = createContext(null)

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [cartItems, setCartItems] = useState(0)
    return <CartContext.Provider value={{ cart, setCart, cartItems, setCartItems }}>
        {children}
    </CartContext.Provider>
}

export default CartProvider