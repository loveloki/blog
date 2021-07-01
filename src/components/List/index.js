import { useEffect, useState } from 'react'
import './index.css'

function List(props) {
  const { handleClickTitle } = props
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
              <img className="h-full w-full object-cover" src={image} alt={title} />
            </aside>
            <article className="flex-1 pl-1">
              <span
                className="text-2xl text-green-400 font-bold cursor-pointer"
                onClick={() => handleClickTitle(params)}
              >
                {title}
              </span>
              <p>{description}</p>
            </article>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default List
