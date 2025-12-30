import { Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import DashSidebar from '../Component/Dashsidebar';
import { account, databases, users } from '../AppwriteConfig';
import { Query } from 'appwrite';
import { FaPencilAlt } from 'react-icons/fa';
import { IoReceipt } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import logo from '../img/acess denied.png'

export default function GetUsers() {
    
    const [user, setUsers] = useState([]);
    const [userData, setUserData] = useState()

    useEffect(() => {
      const getData = async () => {
        const response = await account.get()
        setUserData(response)
      }
      getData()
    }, [])
    const listUsers = async () => {
        try {
          const response = await users.list();
          setUsers(response.users)
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
      
      listUsers();
  return (
    <>
        { userData?.labels[0] === 'admin' ? (
          <div className='min-h-screen'>
              <div className='flex flex-col md:flex-row'>
                 <div className='md:inline hidden'>
                   <DashSidebar />
                 </div>
              <div className='overflow-x-scroll scrollbar'>
                          <Table hoverable className='overflow-x-scroll scrollbar'>
                              <Table.Head>
                                      <Table.HeadCell>
                                          UserName
                                      </Table.HeadCell>
                                      <Table.HeadCell>
                                          Email
                                      </Table.HeadCell>
                                      <Table.HeadCell>
                                          Tel
                                      </Table.HeadCell>
                              </Table.Head>
                              <Table.Body>
                  {
                      user.map((user) => (
                                  <Table.Row>
                                    <Table.Cell>
                                      <h1 className='line-clamp-1'>                            
                                        {user?.name}
                                      </h1>
                                    </Table.Cell>
                                    <Table.Cell>
                                    <h1 className='line-clamp-2'>                            
                                        {user?.email}
                                      </h1>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {user?.phone}
                                    </Table.Cell>
                                    <Table.Cell>
                                      <span className='flex gap-2'>
                                        <FaPencilAlt />
                                        <IoReceipt />
                                      </span>
                                    </Table.Cell>
                                  </Table.Row>
                          ))
                      }
                              </Table.Body>
                          </Table>
              </div>
              </div>
          </div>
        ) : (
          <div className='flex flex-col sm:flex-row gap-3 justify-center items-center min-h-screen'>
            <img src={logo} alt="" className='w-80'/>
            <h1 className='text-2xl font-bold'>Access Denied</h1>
          </div>
        )}
    </>
  )
}
