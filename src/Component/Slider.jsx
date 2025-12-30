import '../App.css'; // Make sure to import your CSS here
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { databases } from '../AppwriteConfig';
import { Query } from 'appwrite';
import { GoHeart } from 'react-icons/go';

const SimpleSlider = () => {
  const [blogs, setBlog] = useState([]);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await databases.listDocuments(
          '67b7400000011dbf91e6',
          '67b74017001ae7cc6a35',
          [
            Query.limit(3),
            Query.orderDesc('createdAt')
          ]
        );
        setBlog(response.documents); // Returns an array of documents
      } catch (error) {
        console.error("Error fetching collection:", error);
      }
    };

    getBlog();
  }, []);

  return (
    <div className="bg-white w-full">
      <div className="grid md:grid-cols-2 justify-center gap-1 max-w-7xl mx-auto w-full p-1 mb-4">
        {blogs.map((blog) => (
          <div key={blog.$id} className="w-full overflow-hidden rounded-md relative bg-white shadow-md">
            <Link to={`/blog/${blog.$id}`}>
              <div className="relative w-full">
                <img
                  src={blog.img}
                  alt={blog.title}
                  className="w-full object-cover sm:h-[400px]"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex justify-between items-center">
                    <h1 className="border-2 border-blue-300 bg-blue-600 text-white w-20 rounded-full text-center text-xs uppercase font-extrabold m-1">
                      .Academy
                    </h1>
                    <GoHeart className="text-white font-extrabold" />
                  </div>
                  <h1 className="uppercase line-clamp-1 text-sm font-bold text-white mt-2">{blog.title}</h1>
                  <p className="line-clamp-2 text-xs text-white">{blog.desc}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleSlider;
