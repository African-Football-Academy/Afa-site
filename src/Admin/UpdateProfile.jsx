import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { account, databases } from '../AppwriteConfig'
import { Button, FileInput, Textarea } from 'flowbite-react'
import { toast, ToastContainer } from 'react-toastify'
import logo from '../img/acess denied.png'

export default function UpdateGallery() {

    const {profileId} = useParams()

    const [image, setImg] = useState(null);
    const [loading, setLoading] = useState(false);  // Loading state
    const [userData, setUserData] = useState()
    const [profiledetail, setProfiledetail] = useState({})

  useEffect(() => {
    const getData = async () => {
      const response = await account.get()
      setUserData(response)
    }
    getData()
  }, [])

    useEffect(() => {
        const getProfiledetail = async () => {
            try {
              const response = await databases.getDocument(
                "67b7400000011dbf91e6", // Replace with your Database ID
                "67b7474a00087b92a06a", // Replace with your Collection ID
                profileId // Replace with your Document ID
              );
              setProfiledetail(response); // Returns an array of document
      
            } catch (error) {
              console.error("Error fetching collection:", error);
            }
          }
          if(profileId) {
            getProfiledetail();
          }
        }, [profileId]);

        const CLOUD_NAME = 'dtux1zkdj';
        const UPLOAD_PRESET = 'afa-site-upload';

  const handleImageChange = async (e) => {
      const file = e.target.files[0];
      if (file) {
          try {
              setLoading(true);
              const imageUrl = await uploadImage(file);
              setImg(imageUrl);
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

 const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedData = {
        desc: profiledetail.desc,
        image: image || profiledetail.img
    };

    try {
          
        await databases.updateDocument(
            '67a5d22900142d063b7c',
            '67b581900024ea216ddb',
            profileId,
            updatedData
        );

        toast.success('Profile Updated successfully!!!');
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
                Update Profile
                </h1>
                <div className='p-4 flex gap-4 justify-between overflow-x-scroll scrollbar'>
                    <span>
                        <h1 className='text-2xl font-bold'>Title</h1>
                        <p className='line-clamp-3'>{profiledetail?.desc}</p>
                    </span>
                    <span>
                        <h1 className='text-2xl font-bold'>Image</h1>
                        <img src={profiledetail?.image} alt="" width={100} />
                    </span>
                </div>
                <form className='flex flex-col gap-4' onSubmit={handleUpdate}>
                <div>
                    <Textarea type='text'
                    placeholder='Titre'
                    className='mb-3'
                    value={profiledetail?.desc}
                    onChange={(e) => setProfiledetail({...profiledetail, desc: e.target.value})}
                    />
                </div>
                <div className='border-4 border-teal-500 border-dotted p-3'>
                    <FileInput type='file'
                    accept='image/*'
                    onChange={handleImageChange} />
                </div>
                {image && (
                                <img
                                className='items-center mx-auto'
                                    src={image}
                                    width={120}
                                />
                            )}
                <Button type='submit' gradientDuoTone='purpleToPink' outline disabled={loading}>
                    {loading ? 'Updating...' : 'Update'}
                </Button>
                </form>
            </div>
        ) : (
          <div className='flex flex-col sm:flex-row gap-3 justify-center items-center min-h-screen'>
            <img src={logo} alt="" className='w-80'/>
            <h1 className='text-2xl font-bold'>Access Denied</h1>
          </div>
        )}
    </>
  )
}
