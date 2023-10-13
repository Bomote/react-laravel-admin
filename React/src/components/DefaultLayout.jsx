import  {Link, Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../context/CreateProvider"

export default function DefaultLayout() {
  const {user, token} = useStateContext()
  
  //redirects to login if user tries to accept pages without loggging in
  if(!token){
    return <Navigate to="/login"/>
  }
  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </aside>
      <div className="content">
        <header>
          <div>Header</div>
          <div>User info</div>
        </header>
        <main>
          <Outlet/>
        </main>
      </div>
    </div>
  )
}
