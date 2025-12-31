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
        <div key={blog.$id} className='p-2 max-w-5xl mx-auto 0 grid sm:grid-cols-2 sm:gap-4'>
          <img src={blog.img} className='flex-1 w-full h-80 object-cover sm:mx-2 rounded-sm sm:scale-110 sm:w-[400px]' />
          <div className='w-full p-4 pt-5'>
              <h1 className="sm:ml-4 bg-yellow-300 text-white w-20 rounded-full text-center text-xs uppercase font-extrabold m-1">
                      .Academy
                    </h1>
              <h1 className='uppercase text-2xl font-bold line-clamp-1 sm:ml-4 text-blue-200'>{blog.title}</h1>
                <p className='text-justify italic line-clamp-2 sm:ml-4'>
                  {blog.desc}
                </p>
              <span className='flex gap-3 mt-[4px]'>
                  <MdFacebook size={20} color='blue' className='hover:scale-125' />
                  <FaYoutube size={21} color='red'className='hover:scale-125'   />
                  <FaXTwitter size={15} color='black' className='hover:scale-125 mt-0.5'  />
              </span>
          </div>
        </div>
        ))
      }
    </div>
  )
}
