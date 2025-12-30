import img2 from '../img/afabg.png'
import Media from '../Component/Media'
import { MdFacebook } from 'react-icons/md'
import { FaXTwitter, FaYoutube } from 'react-icons/fa6'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { databases } from '../AppwriteConfig'
import ReactPlayer from 'react-player'

export default function Play() {

  const { videoId } = useParams();
  const [highlight, setHighlight] = useState()

  useEffect(() => {
    const getvideo = async () => {
      try {
        const response = await databases.getDocument(
          '67b7400000011dbf91e6',
          '67b745140039f51d91f4',
          videoId // Replace with your Document ID
        );
        setHighlight(response); // Returns an array of document

      } catch (error) {
        console.error("Error fetching collection:", error);
      }
    }
    if(videoId) {
      getvideo();
    }
  }, [videoId]);

  return (
    <div className='min-h-screen bg-img1 bg-cover mx-auto'>
        <div className='items-center flex justify-center p-2'>
           <ReactPlayer url={highlight?.video} controls className='' width="auto" />
        </div>
      <div className='max-7xl mx-auto p-2'>
         <span className='flex max-w-4xl mx-auto'>
           <p className='uppercase text-xl font-bold text-blue-500'>{highlight?.title}</p>
        </span>
        <p className='max-w-4xl mx-auto'>{highlight?.desc}</p>
        <div className='flex gap-4 mt-1 p-3 justify-between mx-auto'>
            <div className='mx-auto flex rounded-full gap-1 text-blue-400 font-bold'>
            <div className='w-10'>
                <img src={img2}  />
            </div>
               <h1 className='uppercase sm:mt-2'>African Football Academy</h1>
            </div>
            <span className='flex gap-4 m-4 mx-auto mt-1'>
                <MdFacebook size={20} color='blue' className='hover:scale-125' />
                <FaYoutube size={21} color='red'className='hover:scale-125'   />
                <FaXTwitter size={18} color='black' className='hover:scale-125'  />
            </span>
        </div>
      </div>
      <div>
         <Media />
      </div>
    </div>
  )
}
