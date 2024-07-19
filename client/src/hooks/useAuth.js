import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"

const useAuth = () => {
    let context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used inside the Auth Provider')
    }
    return context;
}

export default useAuth