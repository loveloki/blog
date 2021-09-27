import { useHistory } from 'react-router-dom'
import './index.css'
import Tabs from './Tabs'

function Header(props) {
  const tabs = [
    { label: '文章', value: 'home' },
    { label: '最近阅读', value: 'read' },
    { label: '关于', value: 'about' },
  ]

  let history = useHistory()

  function handleClickTab(tab) {
    history.push(`/${tab.value}`)
  }

  return (
    <header className={props.className + ' flex justify-center items-center'}>
      <Tabs tabs={tabs} handleClickTab={handleClickTab} />
    </header>
  )
}

export default Header
