import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './index.css'

function List() {
  const [list, setList] = useState([])

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/pageCatalog.json`)
      .then((data) => data.json())
      .then((arr) => setList(arr))
  }, [])

  return (
    <article className="max-w-2xl m-auto">
      <ul className="flex flex-col items-center">
        {list.map(({ title, name, description, year, month }) => (
          <li className="flex w-full h-32 mt-2" key={name}>
            <article className="flex-1 pl-1 pt-1">
              <Link to={`article/${year}/${month}/${name}`}>
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

export default List
