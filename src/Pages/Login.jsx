import{ useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { account } from '../AppwriteConfig'
import { toast, ToastContainer } from 'react-toastify'
import { Button, TextInput } from 'flowbite-react'
import img1 from '../img/afabg.png'

function Login() {

   const navigate = useNavigate()
   const [user, setUser] = useState({
        email: "",
        password: ""
   })

   const Login = async (e) => {
     e.preventDefault()

     try {
      await account.createEmailPasswordSession(user.email, user.password);
      navigate("/")
      window.location.reload();
      } catch (error) {
         console.log(error)
         toast.error("Login Failed..........")
      }
     }

    return (
      <div className='min-h-screen flex items-center justify-center bg-img2 bg-cover'>
        <div className=' p-3 max-w-3xl mx-auto'>  
      <ToastContainer />
          {/* right */}
          <div className='w-80 mx-auto flex-1'>
            <form className='flex flex-col gap-4'>

            <img src={img1} width={200} className='rounded-full mx-auto p-2'/>

              <div>
                <TextInput type='text' 
                placeholder='Email' 
                id='email'
                name='email'
                onChange={(e) => {
                    setUser({
                      ...user,
                      email: e.target.value
                    })
                  }}/>
              </div>
              <div>
                <TextInput type='password' 
                placeholder='***********' 
                id='password'
                name='password'
                onChange={(e) => {
                    setUser({
                      ...user,
                      password: e.target.value
                    })
                  }}/>
              </div>
              <Button gradientDuoTone='purpleToPink' type='submit'onClick={Login}>
               Connecte
              </Button>
            </form>
            <div className='gap-1 text-sm mt-2 text-center'> 
              <span className='text-white'>j&apos;ai pas de compte? </span>
              <Link to='/register' className='text-blue-500'>
                Inscription
              </Link>
            </div>
         </div>
        </div>
      </div>
    )
  }

export default Login