import '../App.css'; // Make sure to import your CSS here
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { databases } from '../AppwriteConfig';
import { Query } from 'appwrite';
import { HiPlay } from "react-icons/hi2";
import { MdSportsSoccer } from 'react-icons/md';

export default function Media() {

    const [ video, setVideo] = useState([])

  useEffect(() => {
    const getVideo = async () => {
      try {
        const response = await databases.listDocuments(
          '67b7400000011dbf91e6',
          '67b745140039f51d91f4',
          [
              Query.limit(2),
              Query.orderDesc('createdAt')
          ]
        );
        setVideo(response.documents); // Returns an array of documents
      } catch (error) {
        console.error("Error fetching collection:", error);
      }
    }
    getVideo();
  }, []);
    
  return (
    <div>
     <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto w-full p-1">
    {video.map((vid) => (
      <div 
        key={vid.$id}
        className="relative group cursor-pointer" >
        <Link to={`/play/${vid.$id}`}>
        <div className="mx-auto justify-center overflow-hidden">
          {/* Thumbnail with overlay */}
          <div className="relative">
            
            <img src={vid.thumbnail} className="w-full object-cover md:h-[300px]" />
            
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-100 transition-opacity duration-300">
              <div className="bg-slate-900 hover:bg-black hover:bg-opacity-70 rounded-full p-3">
                <HiPlay size={24} className="text-white" />
              </div>
            </div>
          
          {/* Content */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                            <div className="flex justify-between items-center">
                              <h1 className="border-2 border-blue-300 bg-blue-600 text-white w-20 rounded-full text-center text-xs uppercase font-extrabold m-1">
                                .Academy
                              </h1>
                              <MdSportsSoccer className="text-white font-extrabold" />
                            </div>
                            <h1 className="uppercase line-clamp-1 text-sm font-bold text-white mt-2">{vid.title}</h1>
                          </div>
          </div>
        </div>
      </Link>
      </div>
    ))}
  </div>
    </div>

  )
}
