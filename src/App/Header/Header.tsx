import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <header className="article-header">
      <Link to="/">Home</Link>
    </header>
  )
}

export default Header
