import { Link, useLocation } from 'react-router-dom'
import './index.css'

function Header(props) {
  const location = useLocation()

  return (
    <header className={props.className + ' flex justify-center items-center'}>
      <Link to="/" replace={location.pathname === '/'}>
        <span className="text-4xl cursor-pointer">
          Xleine&lsquo;s
          <sup className="">Blog</sup>
        </span>
      </Link>
    </header>
  )
}

export default Header
