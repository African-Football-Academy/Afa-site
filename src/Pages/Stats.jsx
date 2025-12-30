import { useEffect, useState } from 'react'
import { databases } from "../AppwriteConfig";
import { Query } from 'appwrite';

export default function Stats() {

  const [ stats, setStat] = useState([])

  useEffect(() => {
    const getStat = async () => {
      try {
        const response = await databases.listDocuments(
          '67b7400000011dbf91e6',
          '67b747a4000895f519b2',
          [Query.orderDesc('createdAt')]
        );
        setStat(response.documents); // Returns an array of documents
      } catch (error) {
        console.error("Error fetching collection:", error);
      }
    }
    getStat();
  }, []);
  return (
    <>
    <div className='min-h-screen max-w-6xl mx-auto'>
    <h1 className='text-2xl p-1 font-bold'>Team Stat</h1>
      <div className='flex flex-wrap justify-center p-2 gap-3'>
     {
        stats.map((stat) => (
          <div key={stat.$id} className='flex justify-between bg-blue-500 p-3 rounded-xl w-fit'>
              <img src={stat.player} className='w-32'/>
              <span className=''>
                <p className='w-40 mb-2 uppercase font-bold text-white text-xl'>{stat.name}</p>
                <p className='mt-[-10px] text-green-200 text-xs'>{stat.nationality}</p>
                <span className='flex flex-wrap justify-between mt-1'>
                    <span>
                        <h1 className='text-gray-200 font-bold text-sm'>Position</h1>
                        <h1 className='mb-1 text-xs text-white w-24'>{stat.position}</h1>
                    </span>
                    <span>
                        <h1 className='text-gray-200 font-bold text-sm'>League Rating</h1>
                        <h1 className='mb-1 text-xs text-white'>{stat.rating}</h1>
                    </span>
                </span>
                <h1 className='text-gray-200 font-bold text-sm'>Category</h1>
                <p className='text-white text-xs'>{stat.category}</p>
              </span>
          </div>
                    ))}
      </div>
    </div>
  </>
  )
}
