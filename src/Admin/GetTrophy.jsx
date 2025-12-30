import { Button, Modal, Table } from 'flowbite-react';
import { useEffect, useState } from 'react'
import DashSidebar from '../Component/Dashsidebar';
import { account, databases } from '../AppwriteConfig';
import { Query } from 'appwrite';
import { FaPencilAlt } from 'react-icons/fa';
import { IoReceipt } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import logo from '../img/acess denied.png'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { toast } from 'react-toastify';

export default function GetTrophy() {
    const [ trophy, setTrophy] = useState([])
    const [userData, setUserData] = useState()
    const [showDelete, setShowDelete] = useState(false)
    const [deleteTrophyId, setDeleteTrophyId] = useState()

  useEffect(() => {
    const getData = async () => {
      const response = await account.get()
      setUserData(response)
    }
    getData()
  }, [])

    useEffect(() => {
      const getTrophy = async () => {
        try {
          const response = await databases.listDocuments(
            '67b7400000011dbf91e6',
            '67b748dc00341a15de29',
            [
              Query.orderDesc('createdAt')
            ]
          );
          setTrophy(response.documents); // Returns an array of documents
        } catch (error) {
          console.error("Error fetching collection:", error);
        }
      }
      getTrophy();
    }, []);

    const handleDelete = async () => {
        setShowDelete(false)
        try {
          await databases.deleteDocument(
            '67b7400000011dbf91e6',
            '67b748dc00341a15de29',
            deleteTrophyId // The document ID to delete
          );
          setTrophy((recent) =>
            recent.filter((troph) => troph.$id !== deleteTrophyId))
        } catch (error) {
          toast.error("Error deleting document:", error);
        }
      }

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
                                            Trophy
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            Title
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            Total
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                        Year
                                        </Table.HeadCell>
                                </Table.Head>
                                <Table.Body>
                    {
                        trophy.map((trop) => (
                                    <Table.Row key={trop.$id}>
                                    <Table.Cell>                           
                                        <img src={trop?.trophy_img} width={100} />
                                    </Table.Cell>
                                    <Table.Cell>                           
                                        {trop?.title}
                                    </Table.Cell>
                                    <Table.Cell>                           
                                        {trop.num_title}
                                    </Table.Cell>
                                    <Table.Cell>                           
                                        {trop?.year}
                                    </Table.Cell>
                                    <Table.Cell>
                                    <span className='flex gap-2'>
                                        <Link to={`/updatetrophy/${trop?.$id}`}>
                                          <FaPencilAlt />
                                        </Link>
                                        <span onClick={() => {
                                          setShowDelete(true)
                                          setDeleteTrophyId(trop?.$id)
                                        }}>
                                        <IoReceipt />
                                        </span>
                                      </span>
                                    </Table.Cell>
                                    </Table.Row>
                            ))
                        }
                                </Table.Body>
                            </Table>
                </div>
                <Modal
                    show={showDelete}
                    onClose={()=> setShowDelete(false)}
                    popup size='sm'
                    >
                        <Modal.Header />
                        <Modal.Body>
                        <div className='text-center mx-auto'>
                           <HiOutlineExclamationCircle className='h-14 w-14 mx-auto'/>
                            <h1 className='mb-2'>
                                 Do you want to delete this trophy
                            </h1>
                             <div className='flex gap-3 justify-center mb-2'>
                                <Button 
                                onClick={handleDelete} color='success'>
                                    Yes, I&apos;m Sure
                                </Button>
                                <Button color='failure'
                                onClick={()=> setShowDelete(false)}
                                >
                                    No, Abort
                                </Button>
                             </div>
                        </div>
                        </Modal.Body>
                    </Modal>
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
