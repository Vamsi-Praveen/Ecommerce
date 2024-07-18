import { createContext } from "react";

export const WishlistContext = createContext(null)

const WishlistProvider = ({ children }) => {
    return <WishlistContext.Provider>
        {children}
    </WishlistContext.Provider>
}

export default WishlistProvider