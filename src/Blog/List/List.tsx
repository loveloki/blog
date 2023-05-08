import { Link } from 'react-router-dom'
import usePosts from '@hooks/usePosts'
import './List.css'

interface ListProps {
  isHome: boolean
  activeId: string | undefined
}

function List({ isHome, activeId }: ListProps) {
  const posts = usePosts()
  const type = isHome ? 'full' : 'tiny'
  const className = `post-list ${type}`

  return (
    <nav className={className}>
      <ul>
        {posts.map(({ id, title, desc, tags }) => {
          const className = activeId === id ? 'list-item active' : 'list-item'

          return (
            <li className={className} key={id}>
              <header>
                <Link to={'/posts/' + id}>{title}</Link>
              </header>
              <div>{desc}</div>
              {type === 'full' && (
                <footer>
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </footer>
              )}
            </li>
          )
        })}
      </ul>

    </nav>
  )
}

function Tag({ text }: { text: string }) {
  return <i className="tag">{text}</i>
}

export default List
