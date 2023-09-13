import type { ListItemType } from '@/hooks/useList'
import { Link } from 'react-router-dom'
import './Header.css'

interface HeaderProps {
  type: ListItemType
  activeId?: string
}

function Header({ type, activeId }: HeaderProps) {
  const list: Array<ListItemType | 'tools'> = ['snippets', 'posts', 'tools']
  const lastList = list.filter((t) => t !== type)

  return (
    <header>
      <span>{type}</span>
      {activeId ? (
        <span>
          <span className="split">|</span>
          <Link to={'/' + type}>back</Link>
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
