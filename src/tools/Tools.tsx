import { Outlet, Link } from 'react-router-dom'
import Style from './Tools.module.css'

const list = [
  {
    url: '/',
    text: '主页',
  },
  {
    url: '/tools',
    text: 'tools',
  },
  {
    url: 'web-container',
    text: 'webContainer',
  },
  {
    url: 'font-checker',
    text: 'fontChecker',
  },
]

function Tools() {
  return (
    <div id="tools">
      <nav className={Style.nav}>
        {list.map(({ url, text }) => (
          <Link key={url} to={url}>
            <button>{text}</button>
          </Link>
        ))}
      </nav>

      <Outlet />
    </div>
  )
}

export default Tools
