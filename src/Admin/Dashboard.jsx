import { useEffect, useState } from 'react'
import DashSidebar from '../Component/Dashsidebar'
import { account, databases } from '../AppwriteConfig'
import { BiVideo } from "react-icons/bi"
import {HiCollection} from 'react-icons/hi'
import { FaChartSimple } from 'react-icons/fa6'
import { PiSoccerBallBold } from 'react-icons/pi'
import { GiTrophyCup } from 'react-icons/gi'
import { FcGallery } from 'react-icons/fc'
import logo from '../img/acess denied.png'

export default function Dashboard() {

  const [ category, setCategory ] = useState([])
  const [ blogs, setBlog] = useState([])
  const [ trophy, setTrophy] = useState([])
  const [ video, setVideo] = useState([])
  const [ gallery, setGallery] = useState([])
  const [ stats, setStat] = useState([])
  const [userData, setUserData] = useState()

  useEffect(() => {
    const getData = async () => {
      const response = await account.get()
      setUserData(response)
    }
    getData()
  }, [])

  useEffect(() => {
    const getStat = async () => {
      try {
        const response = await databases.listDocuments(
          '67b7400000011dbf91e6',
          '67b747a4000895f519b2',
        );
        setStat(response.documents); // Returns an array of documents
      } catch (error) {
        console.error("Error fetching collection:", error);
      }
    }
    getStat();
  }, []);

     useEffect(() => {
          const getGallery = async () => {
            try {
              const response = await databases.listDocuments(
                '67b7400000011dbf91e6',
                '67b741e4000a15a0cce3',
              );
              setGallery(response.documents); // Returns an array of documents
            } catch (error) {
              console.error("Error fetching collection:", error);
            }
          }
          getGallery();
        }, []);

  useEffect(() => {
    const getVideo = async () => {
      try {
        const response = await databases.listDocuments(
          '67b7400000011dbf91e6',
          '67b745140039f51d91f4',
        );
        setVideo(response.documents); // Returns an array of documents
      } catch (error) {
        console.error("Error fetching collection:", error);
      }
    }
    getVideo();
  }, []);

  useEffect(() => {
        const getTrophy = async () => {
          try {
            const response = await databases.listDocuments(
                '67b7400000011dbf91e6',
                '67b748dc00341a15de29',
            );
              setTrophy(response.documents); // Returns an array of documents
          } catch (error) {
              console.error("Error fetching collection:", error);
          }
        }
      getTrophy();
  }, []);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await databases.listDocuments(
          '67b7400000011dbf91e6',
          '67b74017001ae7cc6a35',
        );
        setBlog(response.documents); // Returns an array of documents
      } catch (error) {
        console.error("Error fetching collection:", error);
      }
    }
    getBlog();
  }, []);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await databases.listDocuments(
          '67b7400000011dbf91e6',
          '67b740ac0030d5738225',
        );
        setCategory(response.documents); // Returns an array of documents
      } catch (error) {
        console.error("Error fetching collection:", error);
      }
    }
    getCategory();
  }, []);
  

  return (
    <>
    { userData?.labels[0] === 'admin' ? (
      <div className='flex flex-col sm:flex-row'>
        <div className=''>
         <DashSidebar />
        </div>
       <div className='m-3'>
        <div className='flex flex-col sm:flex-row justify-between gap-2 mb-4'>  
        <div className='bg-slate-200 p-3 gap-4 md:w-72
          rounded-md shadow-sm h-fit'>
          <div className='flex justify-between'>
              <div>
                  <h3 className='text-gray-500 text-md uppercase font-semibold'>Blog</h3>
                  <p className='text-2xl'>{blogs.length}</p>
              </div>
              <HiCollection  className=' text-white
                  rounded-full text-5xl p-3 shadow-lg' />
          </div>
          </div>
          <div className='bg-slate-200 p-3 gap-4 md:w-72
          rounded-md shadow-sm h-fit'>
          <div className='flex justify-between'>
              <div>
                  <h3 className='text-gray-500 text-md uppercase font-semibold'>Video</h3>
                  <p className='text-2xl'>{video.length}</p>
              </div>
              <BiVideo  className='text-white
                  rounded-full text-5xl p-3 shadow-lg' />
          </div>
          </div>
          <div className='bg-slate-200 p-3 gap-4 md:w-72
          rounded-md shadow-sm h-fit'>
          <div className='flex justify-between'>
              <div>
                  <h3 className='text-gray-500 text-md uppercase font-semibold'>Gallery</h3>
                  <p className='text-2xl'>{gallery.length}</p>
              </div>
              <FcGallery  className=' text-white
                  rounded-full text-5xl p-3 shadow-lg' />
          </div>
          </div>
        </div>
        <div className='flex flex-col sm:flex-row justify-between gap-2'>   
          <div className='bg-slate-200 p-3 gap-4 md:w-72
          rounded-md shadow-sm h-fit'>
          <div className='flex justify-between'>
              <div>
                  <h3 className='text-gray-500 text-md uppercase font-semibold'>Trophy</h3>
                  <p className='text-2xl'>{trophy.length}</p>
              </div>
              <GiTrophyCup  className='bg-teal-600 text-white
                  rounded-full text-5xl p-3 shadow-lg' />
          </div>
          </div>
          <div className='bg-slate-200 p-3 gap-4 md:w-72
          rounded-md shadow-sm h-fit'>
          <div className='flex justify-between'>
              <div>
                  <h3 className='text-gray-500 text-md uppercase font-semibold'>Category</h3>
                  <p className='text-2xl'>{category.length}</p>
              </div>
              <PiSoccerBallBold  className='bg-teal-600 text-white
                  rounded-full text-5xl p-3 shadow-lg' />
          </div>
          </div>
          <div className='bg-slate-200 p-3 gap-4 md:w-72
          rounded-md shadow-sm h-fit'>
          <div className='flex justify-between'>
              <div>
                  <h3 className='text-gray-500 text-md uppercase font-semibold'>Stats</h3>
                  <p className='text-2xl'>{stats.length}</p>
              </div>
              <FaChartSimple  className='bg-teal-500 text-white
                  rounded-full text-5xl p-3 shadow-lg' />
          </div>
          </div>
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
