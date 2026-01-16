import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { databases } from '../AppwriteConfig'

export default function Matchdetail() {

  const { matchId } = useParams();
  const [match, setMatch] = useState()

  useEffect(() => {
    const getMatch = async () => {
      try {
        const response = await databases.getDocument(
          '67b7400000011dbf91e6',
          '67b745ae00108a8e6895',
          matchId // Replace with your Document ID
        );
        setMatch(response); // Returns an array of document

      } catch (error) {
        console.error("Error fetching collection:", error);
      }
    }
    if(matchId) {
      getMatch();
    }
  }, [matchId]);

  return (
    <div className='bg-img3 bg-cover sm:p-10 p-3 min-h-screen items-center justify-center'>
    <div className='mx-auto max-w-5xl bg-white p-1 rounded-2xl border-2 border-blue-500 shadow-xl'>
        <div>
            <h1 className='text-center text-2xl font-bold text-blue-500'>Upcoming Match</h1>
        </div>
        <div className='flex justify-between items-center p-3 gap-4 max-w-xl mx-auto'>
                    <span className=''>
                        <img src={match?.home_team} width={200} className='rounded-2xl mx-auto w-40' />
                        <p className='text-center uppercase text-sm font-bold w-full'>{match?.home_name}</p>
                    </span>
                    <span className='text-4xl'>
                        -
                    </span>
                    <span className=''>
                        <img src={match?.away_team} width={200} className='rounded-2xl mx-auto w-40' />
                        <p className='text-center uppercase text-sm font-bold w-32 line-clamp-1'>{match?.away_name}</p>
                    </span>
        </div>
        <div className='mx-auto text-center'>
                    <p className='text-black font-bold text-sm'>{match?.stade}</p>
                    <p className='font-semibold text-gray-400'>{match?.date} | {match?.time}</p>
        </div>
        <div className='p-2 flex justify-between'>
          <div className='p-4'>
            <h1 className='font-semibold'>Category</h1>
            <p className='ml-3 text-gray-500'>{match?.category}</p>
          </div>
        </div>
    </div>
    </div>
  )
}
