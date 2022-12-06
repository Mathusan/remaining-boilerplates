import { Menu } from "antd";
import  Link from 'next/link';
import { useRouter } from 'next/router'

import { useAppDispatch, useAppSelector } from '../store/hooks';
import {logout , reset} from '../features/authSlice/auth.slice'
 

export default function NavBar() {

    const router = useRouter()
    const dispatch= useAppDispatch()
    const {user} = useAppSelector((state) => state.auth)

    

    const logOut = () =>{
      dispatch(logout())
      dispatch(reset())
      router.push('/')
    }


  return (
    <>
    <Menu mode="horizontal">
    <Menu.Item key="home">
      <Link href={"/"} style={{textDecoration: "none", color:"black", marginRight:"10px"}}>Home</Link>
      </Menu.Item>
      {user ? (
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
