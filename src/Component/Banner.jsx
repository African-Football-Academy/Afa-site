import { useEffect, useState } from 'react'
import { MdFacebook } from 'react-icons/md'
import { FaXTwitter, FaYoutube } from 'react-icons/fa6'
import { databases } from '../AppwriteConfig'
import { Query } from 'appwrite'

export default function Banner() {

  const [ tblogs, setTBlog] = useState([])

  useEffect(() => {
    const getTBlog = async () => {
      try {
        const response = await databases.listDocuments(
          '67b7400000011dbf91e6',
          '67b74017001ae7cc6a35',
          [
            Query.limit(1),
            Query.orderDesc('createdAt')
          ]
        );
        setTBlog(response.documents); // Returns an array of documents
      } catch (error) {
        console.error("Error fetching collection:", error);
      }
    }
    getTBlog();
  }, []);

  return (
    <div className='bg-blue-600 hover:bg-purple-500'>
      {
        tblogs.map((blog) => (
        <div key={blog.$id} className='p-2 max-w-5xl mx-auto sm:hover:scale-110 flex sm:flex-row flex-col'>
          <img src={blog.img} className='flex-1 w-full rounded-sm sm:w-[400px]' />
          <div className='w-full italic p-4 pt-5'>
              <h1 className='uppercase text-2xl font-bold text-blue-200'>{blog.title}</h1>
                <p className='text-justify line-clamp-2'>
                  {blog.desc}
                </p>
              <span className='flex gap-4 m-4 mt-[-2px]'>
                  <MdFacebook size={30} color='blue' className='hover:scale-125' />
                  <FaYoutube size={31} color='red'className='hover:scale-125'   />
                  <FaXTwitter size={25} color='black' className='hover:scale-125'  />
              </span>
          </div>
        </div>
        ))
      }
    </div>
  )
}
