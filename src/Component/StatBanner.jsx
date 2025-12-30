import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { databases } from "../AppwriteConfig";
import { Query } from "appwrite";
import { Link } from "react-router-dom";

export default function StatBanner() {

    const [ stats, setStat] = useState([])

  useEffect(() => {
    const getStat = async () => {
      try {
        const response = await databases.listDocuments(
          '67b7400000011dbf91e6',
          '67b747a4000895f519b2',
          [
            Query.orderDesc('createdAt'),
            Query.limit(2)
          ]
        );
        setStat(response.documents); // Returns an array of documents
      } catch (error) {
        console.error("Error fetching collection:", error);
      }
    }
    getStat();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div>
        <span className="flex justify-between p-2">
             <h1 className="text-xl font-bold text-blue-600 uppercase">Joueur</h1>
             <Link to='/stat'>
              <p className="flex text-gray-700 hover:text-gray-400 cursor-pointer">Plus de Stat <IoIosArrowForward className="mt-1" size={20}/></p>
             </Link>
        </span>
        <div className='flex flex-wrap mx-auto gap-1 p-5 overflow-x-scroll scrollbar'>
            {
                stats.map((stat) => (
              <div key={stat.$id} className='flex justify-between bg-blue-500 p-3 rounded-xl w-fit border-2 border-blue-700'>
                <img src={stat.player} className='w-32'/>
                <span className=''>
                  <p className='w-40 mb-2 uppercase font-bold text-white text-xl'>{stat.name}</p>
                  <p className='mt-[-10px] text-green-300 text-xs'>{stat.nationality}</p>
                  <span className='flex flex-wrap justify-between mt-1'>
                      <span>
                          <h1 className='text-blue-100 font-bold text-sm'>Position</h1>
                          <h1 className='mb-1 text-xs text-white w-24'>{stat.position}</h1>
                      </span>
                      <span>
                          <h1 className='text-blue-100 font-bold text-sm'>League Rating</h1>
                          <h1 className='mb-1 text-xs text-white'>{stat.rating}</h1>
                      </span>
                  </span>
                  <h1 className='text-blue-100 font-bold text-sm'>Category</h1>
                  <p className='text-white text-xs'>{stat.category}</p>
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
