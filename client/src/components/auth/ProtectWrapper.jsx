import useAuth from '@/hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectWrapper = () => {
    const { user, token } = useAuth()
    if (!user || !token) {
        return <Navigate to={"/auth/login"} />
    }
    return (
        <Outlet />
    )
}

export default ProtectWrapper