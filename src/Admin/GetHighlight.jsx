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
import { toast, ToastContainer } from 'react-toastify';

export default function GetHighlight() {
    const [ video, setVideo] = useState([])
    const [userData, setUserData] = useState()
    const [showDelete, setShowDelete] = useState(false)
    const [deleteVideoId, setDeleteVideoId] = useState()

  useEffect(() => {
    const getData = async () => {
      const response = await account.get()
      setUserData(response)
    }
    getData()
  }, [])

    useEffect(() => {
      const getVideo = async () => {
        try {
          const response = await databases.listDocuments(
           '67b7400000011dbf91e6',
           '67b745140039f51d91f4', // Replace with your Collection ID
            [
              Query.orderDesc('createdAt')
            ]
          );
          setVideo(response.documents); // Returns an array of documents
        } catch (error) {
          console.error("Error fetching collection:", error);
        }
      }
      getVideo();
    }, []);

    const handleDelete = async () => {
      setShowDelete(false)
      try {
        await databases.deleteDocument(
          '67b7400000011dbf91e6',
           '67b745140039f51d91f4', // Replace with your Collection ID
          deleteVideoId // The document ID to delete
        );
        setVideo((recent) =>
          recent.filter((video) => video.$id !== deleteVideoId))
      } catch (error) {
        toast.error("Error deleting document:", error);
      }
    }

  return (
    <>
      { userData?.labels[0] === 'admin' ? (
        <div className='min-h-screen'>
          <ToastContainer />
            <div className='flex flex-col md:flex-row'>
                <div className='md:inline hidden'>
                   <DashSidebar />
                 </div>
            <div className='overflow-x-scroll scrollbar'>
                        <Table hoverable className='overflow-x-scroll scrollbar'>
                            <Table.Head>
                                    <Table.HeadCell>
                                        Titre
                                    </Table.HeadCell>
                                    <Table.HeadCell>
                                        Desc
                                    </Table.HeadCell>
                                    <Table.HeadCell>
                                        Video
                                    </Table.HeadCell>
                            </Table.Head>
                            <Table.Body>
                {
                    video.map((vid) => (
                                <Table.Row key={vid.$id}>
                                  <Table.Cell>
                                    <h1 className='line-clamp-1'>                            
                                      {vid?.title}
                                    </h1>
                                  </Table.Cell>
                                  <Table.Cell>
                                  <h1 className='line-clamp-2'>                            
                                      {vid?.desc}
                                    </h1>
                                  </Table.Cell>
                                  <Table.Cell>
                                    <div className='w-60'>
                                      <video src={vid?.video} width='auto' />
                                    </div>
                                  </Table.Cell>
                                  <Table.Cell>
                                  <span className='flex gap-2'>
                                        <Link to={`/updatevideo/${vid?.$id}`}>
                                          <FaPencilAlt />
                                        </Link>
                                        <span onClick={() => {
                                          setShowDelete(true)
                                          setDeleteVideoId(vid?.$id)
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
                                 Do you want to delete this video
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
