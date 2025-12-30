import { useEffect, useState } from 'react'
import { Button, FileInput, TextInput } from 'flowbite-react'
import { toast, ToastContainer } from 'react-toastify';
import { account, databases } from '../AppwriteConfig';
import { ID } from 'appwrite';
import logo from '../img/acess denied.png'

function AddMatches() {

  const [stade, setStade] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [arbitre, setArbitre] = useState('')
  const [category, setCategory] = useState('')
  const [ticket, setTicket] = useState('')
  const [home_coach, setHome_coach] = useState('')
  const [away_coach, setAway_coach] = useState('')
  const [home_name, setHome_name] = useState('')
  const [away_name, setAway_name] = useState('')
  const [homeimage, sethomeImg] = useState(null);  // Selected image state
  const [awayimage, setawayImg] = useState(null);  // Selected image state
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

  const handlehomeImageChange = async (e) => {
      const file = e.target.files[0];
      if (file) {
          try {
              setLoading(true);
              const imageUrl = await uploadhomeImage(file);
              sethomeImg(imageUrl);
          } catch (err) {
              toast.error(err.message);
          } finally {
              setLoading(false);
          }
      }
  };

  const handleawayImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
        try {
            setLoading(true);
            const imageUrl = await uploadawayImage(file);
            setawayImg(imageUrl);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }
};

  
  const uploadhomeImage = async (file) => {
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

const uploadawayImage = async (file) => {
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

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        // Create matches post document in Appwrite
        await databases.createDocument(
            '67b7400000011dbf91e6',
            '67b745ae00108a8e6895',
            ID.unique(),
            {
                stade,
                time,
                date,
                arbitre,
                category,
                ticket,
                home_name,
                away_name,
                home_team: homeimage,
                away_team: awayimage,
                home_coach,
                away_coach,
                createdAt: new Date().toISOString()
            }
        );

        toast.success('Match added successfully!!!');
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
        Match
      </h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='border-4 border-teal-500 border-dotted p-3'>
          <FileInput type='file'
            accept='image/*'
            onChange={handlehomeImageChange} />
        </div>
          <TextInput type='text'
            placeholder='Home Name'
            required
            className='mb-3'
            value={home_name}
            onChange={(e) => setHome_name(e.target.value)}
          />
        <div className='border-4 border-teal-500 border-dotted p-3'>
          <FileInput type='file'
            accept='image/*'
            onChange={handleawayImageChange} />
        </div>
        <div>
          <TextInput type='text'
            placeholder='Away Name'
            required
            className='mb-3'
            value={away_name}
            onChange={(e) => setAway_name(e.target.value)}
          />
        </div>
        <div>
          <TextInput type='text'
            placeholder='Stade'
            required
            className='mb-3'
            value={stade}
            onChange={(e) => setStade(e.target.value)}
          />
        </div>
        <div>
          <TextInput type='text'
            placeholder='Date'
            required
            className='mb-3'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <TextInput type='text'
          placeholder='Time'
          className='mb-3'
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <TextInput type='text'
          placeholder='Arbitre'
          className='mb-3'
          value={arbitre}
          onChange={(e) => setArbitre(e.target.value)}
        />
        <TextInput type='text'
          placeholder='Category'
          className='mb-3'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <TextInput type='text'
          placeholder='Ticket'
          className='mb-3'
          value={ticket}
          onChange={(e) => setTicket(e.target.value)}
        />
        <TextInput type='text'
          placeholder='Home Coach'
          className='mb-3'
          value={home_coach}
          onChange={(e) => setHome_coach(e.target.value)}
        />
        <TextInput type='text'
          placeholder='Away coach'
          className='mb-3'
          value={away_coach}
          onChange={(e) => setAway_coach(e.target.value)}
        />
        <div className='flex md:flex-row flex-col gap-2 mx-auto items-center'>
               <span>
                {homeimage && (
                        <img
                        className='items-center mx-auto'
                            src={homeimage}
                            width={120}
                        />
                    )}
               </span>
                 <h1 className='text-3xl font-semibold flex justify-center items-center'> VS </h1>
               <span>
                {awayimage && (
                        <img
                        className='items-center mx-auto'
                            src={awayimage}
                            width={120}
                        />
                    )}
               </span>
        </div>
        <Button type='submit' gradientDuoTone='purpleToPink' outline disabled={loading}>
          {loading ? 'Publishing...' : 'Publish'}
        </Button>
      </form>
    </div> ) : (
      <div className='flex flex-col sm:flex-row gap-3 justify-center items-center min-h-screen'>
       <img src={logo} alt="" className='w-80'/>
       <h1 className='text-2xl font-bold'>Access Denied</h1>
       </div>
    ) }
    </>
  )
}

export default AddMatches