// 从某个文件中读取出来目录
// 然后展示出来
import catalog from '../../catalog.json'
import './List.css'

const List = () => {
  return (
    <ul className='catalog'>
      {catalog.map(({ title, key, time, desc }) => (
        <li key={key}>
          <header>
            <a href={'/' + key}>{title}</a>
            <span>{time}</span>
          </header>
          <p>{desc}</p>
        </li>
      ))}
    </ul>
  )
}

export default List
