import { ListItemType } from '@/hooks/useList'
import { Link } from 'react-router-dom'
import './Header.css'

interface HeaderProps {
  setType: Function
  type: ListItemType
  activeId?: string
}

function Header({ type, setType, activeId }: HeaderProps) {
  const list: ListItemType[] = ['snippets', 'posts']
  const lastList = list.filter((t) => t !== type)

  return (
    <header>
      <span>{type}</span>
      {activeId ? (
        <span>
          <span className="split">|</span>
          <Link to="/">back</Link>
        </span>
      ) : (
        lastList.map((type) => {
          return (
            <span key={type}>
              <span className="split">|</span>
              <Link to={'/' + type}>{type}</Link>
            </span>
          )
        })
      )}
    </header>
  )
}

export default Header
