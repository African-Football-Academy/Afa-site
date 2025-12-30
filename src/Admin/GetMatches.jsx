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

export default function GetMatches() {
    const [ matches, setMatches] = useState([])
    const [userData, setUserData] = useState()
    const [showDelete, setShowDelete] = useState(false)
    const [deleteMatchId, setDeleteMatchId] = useState()

  useEffect(() => {
    const getData = async () => {
      const response = await account.get()
      setUserData(response)
    }
    getData()
  }, [])

    useEffect(() => {
      const getMatches = async () => {
        try {
          const response = await databases.listDocuments(
           '67b7400000011dbf91e6',
           '67b745ae00108a8e6895',
            [
              Query.orderDesc('createdAt')
            ]
          );
          setMatches(response.documents); // Returns an array of documents
        } catch (error) {
          console.error("Error fetching collection:", error);
        }
      }
      getMatches();
    }, []);

    const handleDelete = async () => {
      setShowDelete(false)
      try {
        await databases.deleteDocument(
          '67b7400000011dbf91e6',
          '67b745ae00108a8e6895',
          deleteMatchId // The document ID to delete
        );
        setMatches((recent) =>
          recent.filter((match) => match.$id !== deleteMatchId))
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
                        <Table hoverable>
                            <Table.Head>
                                    <Table.HeadCell>
                                        Home Team
                                    </Table.HeadCell>
                                    <Table.HeadCell>
                                        Name
                                    </Table.HeadCell>
                                    <Table.HeadCell>
                                        AWay Team
                                    </Table.HeadCell>
                                    <Table.HeadCell>
                                        Name
                                    </Table.HeadCell>
                                    <Table.HeadCell>
                                        Date
                                    </Table.HeadCell>
                                    <Table.HeadCell>
                                        Time
                                    </Table.HeadCell>
                                    <Table.HeadCell>
                                        Stade
                                    </Table.HeadCell>
                                    <Table.HeadCell>
                                      Category
                                    </Table.HeadCell>
                            </Table.Head>
                            <Table.Body>
                {
                    matches.map((match) => (
                                <Table.Row key={match.$id}>
                                  <Table.Cell>                           
                                      <img src={match?.home_team} width={100} />
                                  </Table.Cell>
                                  <Table.Cell>                           
                                      {match?.home_name}
                                  </Table.Cell>
                                  <Table.Cell>                           
                                      <img src={match?.away_team} width={100} />
                                  </Table.Cell>
                                  <Table.Cell>                           
                                      {match?.away_name}
                                  </Table.Cell>
                                  <Table.Cell>                           
                                      {match?.date}
                                  </Table.Cell>
                                  <Table.Cell>                           
                                      {match?.time}
                                  </Table.Cell>
                                  <Table.Cell>                           
                                      {match?.stade}
                                  </Table.Cell>
                                  <Table.Cell>                           
                                      {match?.category}
                                  </Table.Cell>
                                  <Table.Cell>
                                  <span className='flex gap-2'>
                                        <Link to={`/updatematch/${match?.$id}`}>
                                          <FaPencilAlt />
                                        </Link>
                                        <span onClick={() => {
                                          setShowDelete(true)
                                          setDeleteMatchId(match?.$id)
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
                                 Do you want to delete this match
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
