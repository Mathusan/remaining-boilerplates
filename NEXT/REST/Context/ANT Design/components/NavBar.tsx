import { Menu } from "antd";
import  Link from 'next/link';
import { useRouter } from 'next/router'

import authService from '../api/authService'

import { useAuth } from '../contexts/AuthContext'; //React Context

export default function NavBar() {

    const router = useRouter()
    const {user, logout, isLoggedIn} = useAuth()


    

    const logOut = () =>{
      authService.logout()
      logout()
      router.push('/')
    }


  return (
    <>
      <Menu mode="horizontal">
      <Menu.Item key="home">
        <Link href={"/"} style={{textDecoration: "none", color:"black", marginRight:"10px"}}>Home</Link>
        </Menu.Item>
        {isLoggedIn ? (
          <Menu.Item key="logout">
          <a href="/login"  onClick={logOut} style={{textDecoration: "none", color:"black", marginRight:"10px"}}>Logout</a>
          </Menu.Item>
        ):(
          <>
            <Menu.Item key="login">
            <Link href={"/login"} style={{textDecoration: "none", color:"black", marginRight:"10px"}}>Login</Link>
            </Menu.Item>
            <Menu.Item key="register">
            <Link href={"/register"} style={{textDecoration: "none", color:"black", marginRight:"10px"}}>Register</Link>
            </Menu.Item>
          </>
        )}

      </Menu>
    </>
  )
}
