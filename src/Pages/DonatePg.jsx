import img1 from '../img/bg.png'
import img2 from '../img/afabg.png'
import imgo from '../img/orange money.png'
import imgv from '../img/Bitcoin.svg.webp'
import { MdMail } from 'react-icons/md'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa6'
import { useState } from 'react'
import { Modal } from 'flowbite-react'
export default function DonatePg() {

  const [showOrange, setShowOrange] = useState(false)
  const [showBtc, setShowBtc] = useState(false)

  return (
    <div className="min-h-screen p-10 mx-auto"
    style={{
              backgroundImage: `url(${img1})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            >
       <img src={img2} width={300} className='rounded-full mx-auto p-2'/>
       <span className='flex sm:flex-row flex-col gap-2 justify-center'>
           <h1 className='text-black font-bold text-3xl uppercase text-center'>African Football Academy</h1>
            <p className='bg-blue-600 text-center text-xs font-bold h-fit w-fit sm:mt-2 self-center text-white border-2 border-blue-500 rounded-full p-1'>Formation Club</p>
       </span>
       <span className='flex ma-w-xl justify-center text-blue-500 mx-auto gap-2'>
         <MdMail size={25} />
         <h1>africanfootballacademy0@gmail.com</h1>
       </span>
       <div className='flex mx-auto justify-between max-w-xl gap-2 p-1 overflow-x-scroll scrollbar'>
          <FaFacebook size={50} color='blue' />
          <FaYoutube size={60} color='red' />
          <FaInstagram size={50} color='orange' />
       </div>
       <div className='flex flex-col md:flex-row mx-auto justify-between max-w-3xl gap-7 p-3'>
         <img src={imgo} width={190} className='rounded-md mx-auto shadow-lg' onClick={() => { setShowOrange(true)}} />
         <img src={imgv} width={120} className='mx-auto' onClick={() => { setShowBtc(true)}}/>
       </div>
       <Modal show={showOrange}
                    onClose={()=> setShowOrange(false)}
                    popup size='sm'
                    >
                        <Modal.Header />
                        <Modal.Body>
                        <h1 className='text-center mb-2'>Thank you for the donation!!!</h1>
                        <div className='text-center mx-auto'>
                           <img src={imgo} width={100} className='mx-auto'/>
                            <h1 className='m-2 bg-orange-500 text-white w-40 mx-auto p-1 rounded-full'>
                                 (+237) 696169216
                            </h1>
                        </div>
                        </Modal.Body>
       </Modal>
       <Modal show={showBtc}
                    onClose={()=> setShowBtc(false)}
                    popup size='sm'
                    >
                        <Modal.Header />
                        <Modal.Body>
                        <h1 className='text-center mb-2'>Thank you for the donation!!!</h1>
                        <div className='text-center mx-auto'>
                           <img src={imgv} width={100} className='mx-auto'/>
                           <p>Wallet Adress</p>
                            <h1 className='m-2 bg-orange-300 text-white w-full mx-auto p-1 rounded-full'>
                                 Rv3We39Zxy79Evjw$9oipa28CVbw3
                            </h1>
                        </div>
                        </Modal.Body>
       </Modal>
    </div>
  )
}
