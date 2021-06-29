import './index.css'
function Header(props) {
  return (
    <header className={props.className + ' text-center'}>
      <span className="text-4xl hover:text-green-200">
        Xleine&lsquo;s
        <sup className="">Blog</sup>
      </span>
    </header>
  )
}

export default Header
