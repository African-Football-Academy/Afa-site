import { Button, Modal, Table } from 'flowbite-react';
import { useEffect, useState } from 'react'
import DashSidebar from '../Component/Dashsidebar';
import { account, databases } from '../AppwriteConfig';
import { Query } from 'appwrite';
import { FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../img/acess denied.png'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { toast } from 'react-toastify';

export default function GetProfile() {
    const [profile, setProfile] = useState([])
    const [userData, setUserData] = useState()
    const [showDelete, setShowDelete] = useState(false)
    const [deleteProfileId] = useState()

  useEffect(() => {
    const getData = async () => {
      const response = await account.get()
      setUserData(response)
    }
    getData()
  }, [])

    useEffect(() => {
      const getProfile = async () => {
        try {
          const response = await databases.listDocuments(
            '67b7400000011dbf91e6',
            '67b7474a00087b92a06a',
            [
              Query.orderDesc('createdAt')
            ]
          );
          setProfile(response.documents); // Returns an array of documents
        } catch (error) {
          console.error("Error fetching collection:", error);
        }
      }
      getProfile();
    }, []);

    const handleDelete = async () => {
      setShowDelete(false)
      try {
        await databases.deleteDocument(
          '67b7400000011dbf91e6',
          '67b7474a00087b92a06a',
          deleteProfileId // The document ID to delete
        );
        setProfile((recent) =>
          recent.filter((profile) => profile.$id !== deleteProfileId))
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
                                      Profile
                                  </Table.HeadCell>
                                  <Table.HeadCell>
                                      Image
                                  </Table.HeadCell>
                          </Table.Head>
                          <Table.Body>
              {
                  profile.map((pro) => (
                              <Table.Row key={pro.$id}>
                                <Table.Cell>
                                  <h1 className='line-clamp-2'>                            
                                    {pro?.desc}
                                  </h1>
                                </Table.Cell>
                                <Table.Cell>
                                  <img src={pro?.image} width={100} />
                                </Table.Cell>
                                <Table.Cell>
                                <span className='flex gap-2'>
                                        <Link to={`/updateprofile/${pro?.$id}`}>
                                          <FaPencilAlt />
                                        </Link>
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
                                 Do you want to delete this Profile
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
