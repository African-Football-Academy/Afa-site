import { Footer } from 'flowbite-react'
import { BsFacebook, BsGithub, BsInstagram, BsTwitterX } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import img1 from '../img/afabg.png'

export default function FooterComp() {
  return (
    <div>
      <Footer container className='border border-t-8 border-teal-500'>
    <div className='w-full mx-auto'>
      <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
        <div className='mt-5'>
           <Link to='/' className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
              <img src={img1} width={50} alt="" />
          </Link>
        </div>
        <div className='grid grid-cols-3 gap-8 mt-5 sm:grid-cols-3 sm:gap-6'>
           <div>
            <Footer.Title title='ABOUT' />
            <Footer.LinkGroup col>
              <Footer.Link>
              <Link to='/about'>
                Biography
              </Link>
              </Footer.Link>
            </Footer.LinkGroup>
           </div>
           <div>
           <Footer.Title title='FOLLOW US' />
            <Footer.LinkGroup col>
              <Footer.Link>
                Facebook
              </Footer.Link>
              <Footer.Link>
                Youtube
              </Footer.Link>
            </Footer.LinkGroup>
           </div>
           </div>
      </div>
      <Footer.Divider />
      <div className='w-full flex justify-between'>
         <Footer.Copyright  by='TechNovaCorp@@' year={new Date().getFullYear()}/>
         <div className=' flex gap-6 justify-center'>
            <Footer.Icon href='#' icon={BsFacebook} />
            <Footer.Icon href='#' icon={BsInstagram} />
            <Footer.Icon href='#' icon={BsTwitterX} />
            <Footer.Icon href='#' icon={BsGithub} />
         </div>
      </div>
    </div>
   </Footer>
    </div>
  )
}
