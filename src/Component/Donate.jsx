import { FcDonate } from "react-icons/fc"
import { Link } from "react-router-dom"
export default function Donate() {
  return (
    <Link to='/donate'>
      <button className="sm:inline flex gap-1 fixed bottom-10 right-5 transform translate-y-1 p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-blue-400 transition duration-300">
        <FcDonate size={30}/>
      </button>
    </Link>
  )
}
