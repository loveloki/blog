import { Link } from 'react-router-dom'
import useList, { ListItemType } from '@/hooks/useList'
import './List.css'

interface ListProps {
  activeId: string | undefined
  type: ListItemType
}

function List({ activeId, type }: ListProps) {
  const posts = useList(type)

  return (
    <nav>
      <ul>
        {posts.map(({ id, title, desc, tags }) => {
          const className = activeId === id ? 'list-item active' : 'list-item'

          return (
            <li className={className} key={id}>
              <header>{'{'}</header>
              <div className='title'>
                <span>title:</span>
                <Link to={'/' + type + '/' + id}>{title}</Link>
              </div>
              <div className='desc'>
                <span>desc: </span>
                {desc}</div>
              <div className='tags'>
                <span>tags:</span>
                {tags.map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
              </div>
              <footer>{'}'}</footer>
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
