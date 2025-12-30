import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { account } from '../AppwriteConfig'
import { toast, ToastContainer } from 'react-toastify'
import { Button, TextInput } from 'flowbite-react'
import img1 from '../img/profile.png'

export default function Account() {

  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState()

  useEffect(() => {
    const getData = async () => {
      const response = await account.get()
      setUserData(response)
      setName(response.name);
      setEmail(response.email);
      setPhone(response.phone);
    }
    getData()
  }, [])
  
  const Signout = async () => {
  try {
    await account.deleteSession('current');
    navigate('/login'); // Redirect to login page
  } catch (error) {
    toast.error('Logout failed:', error.message);
  }
  window.location.reload();
 };

 const handleUpdate = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // Update name
    if (name !== userData?.name) {
      await account.updateName(name);
    }
    // Update email (requires re-authentication)
    if (email !== userData?.email) {
      await account.updateEmail(email);
    }
    if (phone !== userData?.phone) {
      await account.updatePhone(phone);
    }
    toast.success("Profile updated successfully!");
  } catch (error) {
    toast.error("Update failed: " + error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
    {
        userData ? (

            <div className='min-h-screen text-white flex flex-col items-center justify-center mx-auto m-2 bg-img2 bg-cover'>
                <ToastContainer />
                <div className='flex m-2 rounded-xl sm:gap-2 justify-between bg-blue-600 shadow-xl p-4'>
                <img src={img1} className='w-28 mx-auto' />
                <span className='flex flex-col justify-center text-xl'>
                    <h1>{userData?.name}</h1>
                    <h1>{userData?.email}</h1>
                    <h1>{userData?.phone}</h1>
                    <Button className='mt-2 bg-red-500' onClick={Signout}>Signout</Button>
                </span>
                </div>
                <form className='w-80 m-5 bg-blue-600 p-3 rounded-xl' onSubmit={handleUpdate}>
                    <h1 className='text-2xl font-bold text-center mb-1'>Update Account</h1>
                    <div className='mb-2'>
                        <TextInput placeholder='Name' 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <TextInput placeholder='Email'  
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    {
                      userData?.phone && (
                      <div className='mb-2'>
                          <TextInput placeholder='Phone'
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)} />
                      </div>
                      )
                    }
                      <Button className='w-full' type='submit' gradientDuoTone='purpleToPink' outline disabled={loading}>
                          {loading ? 'Updating...' : 'Update'}
                      </Button>
                </form>
            </div>

        ) : (  
            <div className='min-h-screen bg-img1 bg-cover flex flex-col items-center justify-center'>
              <p>No User Account Login...</p>
              <Link to='/login'><Button className='mt-2 bg-blue-500 text-white w-40' gradientDuoTone='pinkToOrange'>Login</Button></Link>
            </div>
            )
    }

    </div>
  )

}
