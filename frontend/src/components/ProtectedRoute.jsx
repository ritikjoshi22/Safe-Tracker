import { useContext } from "react"
import { Store } from "../Store"
import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoute() {
    const {
      state: { userInfo, empInfo },
    } = useContext(Store)
  
    if (userInfo) {
      return <Outlet />
    } else if(empInfo){
      return <Outlet />
    } else {
      return <Navigate to="/signin" />
    }
  }