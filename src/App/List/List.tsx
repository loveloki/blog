// 从某个文件中读取出来目录
// 然后展示出来
import { Link } from 'react-router-dom'
import catalog from '../../catalog.json'
import './List.css'

const List = () => {
  return (
    <ul className='catalog'>
      {catalog.map(({ title, key, time, desc }) => (
        <li key={key}>
          <header>
            <Link to={'/article/' + key} >{title} </Link>
            <span>{time}</span>
          </header>
          <p>{desc}</p>
        </li>
      ))}
    </ul>
  )
}

export default List
