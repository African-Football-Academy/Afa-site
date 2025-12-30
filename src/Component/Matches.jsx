import { useState, useEffect } from 'react';
import '../App.css'; // Make sure to import your CSS here
import { Link } from 'react-router-dom';
import { databases } from '../AppwriteConfig';
import { Query } from 'appwrite';

const Matches = () => {

    const [ matches, setMatches] = useState([])

     useEffect(() => {
          const getMatches = async () => {
            try {
              const response = await databases.listDocuments(
                '67b7400000011dbf91e6',
                '67b745ae00108a8e6895',
                [
                  Query.limit(4),
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

  return (
    <div className='flex gap-5 max-w-7xl mx-auto p-5 overflow-x-scroll scrollbar'>
            { matches.map((match) => (
             <div key={match.$id} className='p-2 bg-gray-100 mx-auto text-2xl shadow-xl'>
                <Link to={`/matchdet/${match.$id}`}>
                        <div className='flex justify-between items-center p-3 mx-auto gap-4'>
                            <span className='w-20'>
                                <img src={match.home_team} width={60} className='rounded-2xl mx-auto' />
                            </span>
                            <span>
                                VS
                            </span>
                            <span className='w-20'>
                                <img src={match.away_team} width={60} className='mx-auto rounded-2xl' />
                            </span>
                        </div>
                        <div className='mx-auto text-center'>
                            <p className='text-sm text-black'>{match.stade}</p>
                            <p className='text-xs text-gray-400'>{match.date} | {match.time}</p>
                        </div>
                </Link>
             </div>
            ))}
    </div>
  );
};

export default Matches;