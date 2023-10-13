import { Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../context/CreateProvider"

export default function GuestLayout() {
    const {token} = useStateContext()

    //if they're already signed in and trying to sign in they are redirected to homepage
    if(token){
        return <Navigate to="/"/>
    }
  return (
    <div>
        Guest
        <Outlet/>
    </div>
  )
}
