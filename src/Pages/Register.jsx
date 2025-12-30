import { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { Button, TextInput } from 'flowbite-react'
import img2 from '../img/afabg.png'
import { account } from '../AppwriteConfig'
import { ID } from 'appwrite'
import { toast, ToastContainer } from 'react-toastify';

function Register() {

    const navigate = useNavigate()
    const [user, setUser] = useState({
       name: "",
       email: "",
       password: ""
    })

     const signup = async (e) => {
        e.preventDefault()
          const promise = account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
          );
          promise.then(
            function(response){
              console.log(response)
              navigate("/login")
            },
            function(error) {
              console.log(error)
              toast.error("Please Create Account Access");
            }
          )
     }

    return (
      <div className='min-h-screen flex items-center justify-center bg-img2 bg-cover'>
      <ToastContainer />
        <div className='p-3 max-w-3xl mx-auto'>
          {/* right */}
          <div className='w-80 mx-auto flex-1'>
         
          <img src={img2} width={200} className='rounded-full mx-auto m-4'/>

            <form className='flex flex-col gap-4'>
              <div>
                <TextInput type='text' 
                placeholder='Username'
                id='name' 
                name='name'
                required 
                onChange={(e) => {
                  setUser({
                    ...user,
                    name: e.target.value
                  })
                }}/>
              </div>
              <div> 
                <TextInput type='email' 
                  placeholder='Email'
                  id='email' 
                  name='email'
                  required 
                  onChange={(e) => {
                    setUser({
                      ...user,
                      email: e.target.value
                    })
                  }}/>
              </div>
              <div> 
                <TextInput type='password' 
                  placeholder='********'
                  id='password' 
                  name='password'
                  required 
                  onChange={(e) => {
                    setUser({
                      ...user,
                      password: e.target.value
                    })
                  }}/>
              </div>
              <p className='text-center text-sm text-white'>Password must be 8 or more characters</p>
              <Button 
              onClick={signup}
              gradientDuoTone='purpleToPink' 
              type='submit'>
              Inscrire
              </Button>
            </form>
            <div className='gap-1 text-sm mt-2 text-center'> 
              <span className='text-white'>j&apos;ai un compte? </span>
              <Link to='/login' className='text-blue-500'>
                Connecte
              </Link>
            </div>
         </div>
        </div>
      </div>
    )
  }

export default Register