import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { useAuth } from '../contexts/AuthContext'


export default function Home() {

  const {user} = useAuth()

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
