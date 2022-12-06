import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {  useAppSelector } from '../store/hooks';



export default function Home() {

  const {user} = useAppSelector((state) => state.auth)

  return (
    <>
    <div>
        <h3>
        Welcome {user?.name}
        </h3>
    </div>
    </>
    
  )
}
