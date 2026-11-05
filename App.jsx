import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './Component/Header'
import Home from './Pages/Home'
import './App.css'
import FooterComp from './Component/FooterComp'
import Matchdetail from './Pages/Matchdetail'
import Gallery from './Pages/Gallery'
import Trophy from './Pages/Trophy'
import Blog from './Pages/Blog'
import Play from './Pages/Play'
import Stats from './Pages/Stats'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Addblog from './Admin/Addblog'
import AddCategory from './Admin/Addcategory'
import AddGallery from './Admin/AddGallery'
import AddVideo from './Admin/AddHightlight'
import AddMatches from './Admin/AddMatches'
import AddPartners from './Admin/Addpartners'
import AddStats from './Admin/AddStats'
import AddTrophy from './Admin/AddTrophy'
import AddHero from './Admin/AddHero'
import AddProfile from './Admin/Addprofile'
import Dashboard from './Admin/Dashboard'
import Account from './Component/Account'
import GetBlog from './Admin/GetBlog'
import GetCategory from './Admin/GetCategory'
import GetGallery from './Admin/GetGallery'
import GetHighlight from './Admin/GetHighlight'
import GetMatches from './Admin/GetMatches'
import GetPartners from './Admin/GetPartners'
import GetHero from './Admin/GetHero'
import GetStats from './Admin/GetStats'
import GetTrophy from './Admin/GetTrophy'
import GetProfile from './Admin/Getprofile'
import UpdateBlog from './Admin/UpdateBlog'
import Profile from './Pages/Profile'
import UpdateCategory from './Admin/UpdateCategory'
import ScrollToTop from './Component/scroll'
import UpdateGallery from './Admin/UpdateGallery'
import UpdateHero from './Admin/UpdateHero'
import UpdateHightlight from './Admin/UpdateHightlight'
import UpdateMatch from './Admin/UpdateMatches'
import UpdatePartner from './Admin/UpdatePartner'
import UpdateStat from './Admin/UpdateStats'
import UpdateTrophy from './Admin/UpdateTrophy'
import UpdateProfile from './Admin/UpdateProfile'
import Donate from './Component/Donate'
import DonatePg from './Pages/DonatePg'

function App() {

  return (
    <>
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/trophy" element={<Trophy />} />
          <Route path="/blog/:blogId" element={<Blog />} />
          <Route path="/play/:videoId" element={<Play />} />
          <Route path="/matchdet/:matchId" element={<Matchdetail />} />
          <Route path="/about" element={<Profile />} />
          <Route path="/stat" element={<Stats />} />
          <Route path="/account" element={<Account />} />
          <Route path="/donate" element={<DonatePg />} />
            <Route path='/addblog' element={<Addblog />} />
            <Route path='/addcat' element={<AddCategory />} />
            <Route path='/addgal' element={<AddGallery />} />
            <Route path='/addvid' element={<AddVideo />} />
            <Route path='/addmatch' element={<AddMatches />} />
            <Route path='/addpartners' element={<AddPartners />} />
            <Route path='/addstats' element={<AddStats />} />
            <Route path='/addtrophy' element={<AddTrophy />} />
            <Route path='/addhero' element={<AddHero />} />
            <Route path='/addprofile' element={<AddProfile />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path="/blogs" element={<GetBlog />} />
            <Route path="/category" element={<GetCategory />} />
            <Route path="/getgallery" element={<GetGallery />} />
            <Route path="/videos" element={<GetHighlight />} />
            <Route path="/matches" element={<GetMatches />} />
            <Route path="/partners" element={<GetPartners />} />
            <Route path="/hero" element={<GetHero />} />
            <Route path="/stats" element={<GetStats />} />
            <Route path="/trophys" element={<GetTrophy />} />
            <Route path="/getprofile" element={<GetProfile />} />
            <Route path="/updateblog/:blogId" element={<UpdateBlog />} />
            <Route path="/updatecategory/:catId" element={<UpdateCategory />} />
            <Route path="/updategallery/:galleryId" element={<UpdateGallery />} />
            <Route path="/updatehero/:heroId" element={<UpdateHero />} />
            <Route path="/updatevideo/:videoId" element={<UpdateHightlight />} />
            <Route path="/updatematch/:matchId" element={<UpdateMatch />} />
            <Route path="/updatepartner/:partnerId" element={<UpdatePartner />} />
            <Route path="/updatestat/:statId" element={<UpdateStat />} />
            <Route path="/updatetrophy/:trophyId" element={<UpdateTrophy />} />
            <Route path="/updateprofile/:profileId" element={<UpdateProfile />} />
        </Routes>
        <Donate />
        <FooterComp />
      </Router>
    </>
  )
}

export default App