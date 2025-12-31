import { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { databases } from '../AppwriteConfig';
import { Query } from 'appwrite';
export default function Gallery() {

  const [ gallery, setGallery] = useState([])

     useEffect(() => {
          const getGallery = async () => {
            try {
              const response = await databases.listDocuments(
                '67b7400000011dbf91e6',
                '67b741e4000a15a0cce3',
                [Query.orderDesc('createdAt')]
              );
              setGallery(response.documents); // Returns an array of documents
            } catch (error) {
              console.error("Error fetching collection:", error);
            }
          }
          getGallery();
        }, []);

  return (
    <div className='bg-img1 bg-cover'>
      <div className='min-h-screen max-w-7xl mx-auto'>
        <motion.h1 
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className='text-center text-4xl text-blue-500 font-bold p-3'>
            Gallery
        </motion.h1>
        <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className='flex justify-between gap-2 flex-wrap mx-auto p-4'
        >
        {
           gallery.map((gall) => (          
            <motion.span
            key={gall.$id}
            className='mx-auto w-72 hover:bg-white hover:h-fit p-8 rounded-2xl '
            >
              <img src={gall.img} alt="" width={500} height={500} className='rounded-3xl border-red-200 p-1 rotate-6' />
              <p className='rotate-6 text-xs font-medium uppercase'>{gall.title}</p>
            </motion.span>
        ))}
        </motion.div>
      </div>
    </div>
  )
}
