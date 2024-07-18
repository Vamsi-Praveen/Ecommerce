import { CartContext } from "@/context/CartContext"
import { useContext } from "react"

const useCart = () => {
    let context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used inside the Cart Provider')
    }
    return context;
}

export default useCart