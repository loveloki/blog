import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './index.css'

function List() {
  const [list, setList] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:4523/mock/395561/article/list')
      .then((data) => {
        return data.json()
      })
      .then((data) => {
        console.log('data, data', data)

        setList(data.data.list)
      })
  }, [])

  return (
    <article className="max-w-2xl m-auto">
      <ul className="flex flex-col items-center">
        {list.map(({ image, title, description, params }) => (
          <li className="flex w-full h-32 mt-2" key={title}>
            <aside className="w-32 h-32">
              <img className="h-full w-full p-2 object-cover" src={image} alt={title} />
            </aside>
            <article className="flex-1 pl-1 pt-1">
              <Link to={articlePath(params)}>
                <span className="text-2xl text-green-400 font-bold cursor-pointer">{title}</span>
              </Link>
              <p className="mt-2 max-line-3-ellipsis">{description}</p>
            </article>
          </li>
        ))}
      </ul>
    </article>
  )
}

function articlePath(params) {
  const { year, month, title } = params

  return `article/${year}/${month}/${title}`
}

export default List
