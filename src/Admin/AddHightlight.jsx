import { useEffect, useState } from 'react'
import { Button, FileInput, TextInput } from 'flowbite-react'
import { toast, ToastContainer } from 'react-toastify';
import { account, databases } from '../AppwriteConfig';
import { ID } from 'appwrite';
import logo from '../img/acess denied.png'

function AddGallery() {

  const [thumbnail, setThumbnail] = useState(null)
  const [title , setTitle] = useState('')
  const [desc , setDesc] = useState('')
  const [vid, setVid] = useState(null);  // Selected image state
  const [loading, setLoading] = useState(false);  // Loading state
  const [userData, setUserData] = useState()

  useEffect(() => {
    const getData = async () => {
      const response = await account.get()
      setUserData(response)
    }
    getData()
  }, [])
  
  const CLOUD_NAME = 'dtux1zkdj';
  const UPLOAD_PRESET = 'afa-site-upload';

  const handleImage = async (e) => {
      const file = e.target.files[0];
      if (file) {
          try {
              setLoading(true);
              const thumbnail = await uploadImg(file);
              setThumbnail(thumbnail);
          } catch (err) {
              toast.error(err.message);
          } finally {
              setLoading(false);
          }
      }
  };

  const uploadImg = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error('Image upload failed');
        }

        const data = await response.json();
        return data.secure_url;
    } catch (err) {
        throw new Error('Failed to upload image: ' + err.message);
    }
};

  const handleImageChange = async (e) => {
      const file = e.target.files[0];
      if (file) {
          try {
              setLoading(true);
              const imageUrl = await uploadImage(file);
              setVid(imageUrl);
          } catch (err) {
              toast.error(err.message);
          } finally {
              setLoading(false);
          }
      }
  };
  
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error('Image upload failed');
        }

        const data = await response.json();
        return data.secure_url;
    } catch (err) {
        throw new Error('Failed to upload image: ' + err.message);
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        // Create video post document in Appwrite
        await databases.createDocument(
            '67b7400000011dbf91e6',
            '67b745140039f51d91f4',
            ID.unique(),
            {
                thumbnail,
                title,
                desc,
                video: vid,
                createdAt: new Date().toISOString()
            }
        );

        toast.success('Highlight added successfully!');
    } catch (err) {
        toast.error('Failed: ' + err.message);
    } finally {
        setLoading(false);
    }
};


  return (
    <>  
     { userData?.labels[0] === 'admin' ? (   
     <div className='p-3 max-w-6xl mx-auto flex-1 w-full'>
       <ToastContainer />
       <h1 className='text-center text-3xl my-7 font-semibold'>
         Highlight
       </h1>
       <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
         <div className='border-4 border-teal-500 border-dotted p-3'>
           <FileInput type='file'
             accept='image/*'
             onChange={handleImage} />
         </div>
         <div>
           <TextInput type='text'
             placeholder='Titre'
             required
             className='mb-3'
             value={title}
             onChange={(e) => setTitle(e.target.value)}
           />
         </div>
         <div>
           <TextInput type='text'
             placeholder='Description'
             required
             className='mb-3'
             value={desc}
             onChange={(e) => setDesc(e.target.value)}
           />
         </div>
         <div className='border-4 border-teal-500 border-dotted p-3'>
           <FileInput type='file'
             accept='video/*'
             onChange={handleImageChange} />
         </div>
         {vid && (
                        <video controls className='p-4 mx-auto'>
                        <source src={vid} width={200} />
                     </video>
                     )}
         <Button type='submit' gradientDuoTone='purpleToPink' outline disabled={loading}>
           {loading ? 'Publishing...' : 'Publish'}
         </Button>
       </form>
     </div>
     ) : (
      <div className='flex flex-col sm:flex-row gap-3 justify-center items-center min-h-screen'>
        <img src={logo} alt="" className='w-80'/>
        <h1 className='text-2xl font-bold'>Access Denied</h1>
      </div>
     ) }
    </>
  )
}

export default AddGallery
