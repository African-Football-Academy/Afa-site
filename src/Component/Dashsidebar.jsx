import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Sidebar } from 'flowbite-react'
import { BiPackage, BiSolidPackage, BiStats, BiVideo, BiVideoPlus } from "react-icons/bi"
import { HiChartPie, HiCollection, HiFolderAdd, HiOutlineBell, HiOutlineUserGroup } from 'react-icons/hi'
import { FaSafari } from 'react-icons/fa'
import { FaAddressCard, FaChartSimple, FaEthereum } from 'react-icons/fa6'
import { TbSoccerField } from 'react-icons/tb'
import { PiSoccerBallBold } from 'react-icons/pi'
import { GiTrophyCup } from 'react-icons/gi'
import { FcAddDatabase, FcGallery } from 'react-icons/fc'
import { MdAddAPhoto, MdLibraryAdd } from 'react-icons/md'
import { account } from '../AppwriteConfig'

export default function DashSidebar() {

  const path = useLocation().pathname

  const navigate = useNavigate()

  const Signout = async () => {
    try {
      await account.deleteSession('current');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.log('Logout failed:', error.message);
    }
    window.location.reload();
   };

  return (
    /* call sidebar from flowbite*/
   <Sidebar className='w-full md:w-60 '>
    <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-3'>
            <Link to='/dashboard'>
                <Sidebar.Item  active = { path == 'dashboard' }
                icon={ HiChartPie }
                labelColor='dark'  
                as='div'>
                   Dashboard
                </Sidebar.Item>
            </Link>
            <Link to='/getprofile'>
                <Sidebar.Item  active ={ path === 'getprofile' } 
                icon={ HiOutlineUserGroup } 
                as='div'>
                    Profile
                </Sidebar.Item>
            </Link>
            <Link to='/addblog'>
                <Sidebar.Item 
                /* assign a tab url path for the profile page &&
                a condition for if user is an Admin label=Adlmin else label=user*/ 
                active ={ path === 'addblog' } 
                icon={ HiFolderAdd } 
                as='div'>
                    Ajoute un Blog
                </Sidebar.Item>
            </Link>
            <Link to='/blogs'>
                <Sidebar.Item 
                /* assign a tab url path for the profile page &&
                a condition for if user is an Admin label=Adlmin else label=user*/ 
                active ={ path === 'blogs' } 
                icon={ HiCollection } 
                as='div'>
                    Vos Blogs
                </Sidebar.Item>
            </Link>
            <Link to='/addvid'>
                <Sidebar.Item  active ={ path === 'addvid' }
                icon={ BiVideoPlus } 
                as='div'>
                    Ajoute une video
                </Sidebar.Item>
            </Link>
            <Link to='/videos'>
                <Sidebar.Item  active ={ path === 'videos' }
                icon={ BiVideo } 
                as='div'>
                    Vos videos
                </Sidebar.Item>
            </Link>
            <Link to='/addmatch'>
                <Sidebar.Item  active ={ path === 'addmatch' }
                icon={ FaSafari } 
                as='div'>
                    Ajoute un Matches
                </Sidebar.Item>
            </Link>
            <Link to='/matches'>
                <Sidebar.Item  active ={ path === 'matches' }
                icon={ TbSoccerField } 
                as='div'>
                    Vos Matches
                </Sidebar.Item>
            </Link>
            <Link to='/addstats'>
                <Sidebar.Item  active ={ path === 'addstats' }
                icon={ BiStats } 
                as='div'>
                    Ajoute un Stats
                </Sidebar.Item>
            </Link>
            <Link to='/stats'>
                <Sidebar.Item  active ={ path === 'stats' }
                icon={ FaChartSimple } 
                as='div'>
                    Vos Stats
                </Sidebar.Item>
            </Link>
            <Link to='/addgal'>
                <Sidebar.Item  active ={ path === 'addgal' }
                icon={ MdAddAPhoto } 
                as='div'>
                    Ajoute une Photo
                </Sidebar.Item>
            </Link>
            <Link to='/getgallery'>
                <Sidebar.Item  active ={ path === 'gallery' }
                icon={ FcGallery } 
                as='div'>
                    Vos Gallery
                </Sidebar.Item>
            </Link>
            <Link to='/addtrophy'>
                <Sidebar.Item  active ={ path === 'addtrophy' }
                icon={ FcAddDatabase } 
                as='div'>
                    Ajoute un Trophy
                </Sidebar.Item>
            </Link>
            <Link to='/trophys'>
                <Sidebar.Item  active ={ path === 'trophy' }
                icon={ GiTrophyCup } 
                as='div'>
                    Vos Trophy
                </Sidebar.Item>
            </Link>
            <Link to='/addhero'>
                <Sidebar.Item  active ={ path === 'addhero' }
                icon={ MdLibraryAdd } 
                as='div'>
                    Ajoute un Hero
                </Sidebar.Item>
            </Link>
            <Link to='/hero'>
                <Sidebar.Item  active ={ path === 'hero' }
                icon={ FaEthereum } 
                as='div'>
                    Vos Hero
                </Sidebar.Item>
            </Link>
            <Link to='/addpartners'>
                <Sidebar.Item  active ={ path === 'addpartners' }
                icon={ BiSolidPackage } 
                as='div'>
                    Ajoute un Partners
                </Sidebar.Item>
            </Link>
            <Link to='/partners'>
                <Sidebar.Item  active ={ path === 'partners' }
                icon={ BiPackage } 
                as='div'>
                    Vos Partners
                </Sidebar.Item>
            </Link>
            <Link to='/addcat'>
                <Sidebar.Item  active ={ path === 'addcat' }
                icon={ FaAddressCard } 
                as='div'>
                    Ajoute un Category
                </Sidebar.Item>
            </Link>
            <Link to='/category'>
                <Sidebar.Item  active ={ path === 'category' }
                icon={ PiSoccerBallBold } 
                as='div'>
                    Vos Category
                </Sidebar.Item>
            </Link>
            <Sidebar.Item  icon={ HiOutlineBell}
                onClick={Signout}
                className='cursor-pointer'>
                Deconnecter
            </Sidebar.Item>
        </Sidebar.ItemGroup>
    </Sidebar.Items>
   </Sidebar>
  )
}
