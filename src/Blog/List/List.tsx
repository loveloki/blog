import { Link } from 'react-router-dom'
import usePosts from '../../hooks/usePosts'
import './List.css'

function List() {
  const posts = usePosts()

  return (
    <ul>
      {posts.map(({ id, title, desc, tags }) => {
        return (
          <li className="list-item" key={id}>
            <header>
              <Link to={'/posts/' + id}>{title}</Link>
            </header>
            <div>{desc}</div>
            <footer>
              {tags.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </footer>
          </li>
        )
      })}
    </ul>
  )
}

function Tag({ text }: { text: string }) {
  return <i className="tag">{text}</i>
}

export default List
