import { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { account } from '../AppwriteConfig'

export default function AdminRoute() {
   
    const [userData, setUserData] = useState()

  useEffect(() => {
    const getData = async () => {
      const response = await account.get()
      setUserData(response)
    }
    getData()
  }, [])

   return userData ? <Outlet /> : <Navigate to='/login' />
}
