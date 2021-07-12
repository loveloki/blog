import { Link } from 'react-router-dom'
import useCatalog from '../../hooks/catalog'
import './index.css'

function List() {
  const catalogArray = useCatalog()

  return (
    <article className="max-w-2xl m-auto">
      <ul className="flex flex-col items-center">
        {catalogArray.map(({ title, name, description, year, month }) => (
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
