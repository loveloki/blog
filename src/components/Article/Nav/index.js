import { useEffect, useState } from 'react'

export default function Nav(markdownContent) {
  const [nav, setNav] = useState(null)

  useEffect(() => {
    if (!markdownContent) {
      return
    }

    const headers = document.querySelector('.markdown-body').querySelectorAll('h2,h3,h4,h5,h6')
    const nav = Array.prototype.map.call(headers, (Node) => (
      <li
        className={tag2className(Node.tagName) + ' whitespace-nowrap overflow-hidden overflow-ellipsis'}
        title={Node.textContent}
        key={Node.id}
      >
        <a href={`#${Node.id}`}>{Node.textContent}</a>
      </li>
    ))

    setNav(nav)
  }, [markdownContent])

  return (
    <nav className="sticky top-5">
      <span className="inline-block font-bold text-2xl mb-3 border-b-2 border-pink-500">目录</span>
      <ul>{nav}</ul>
    </nav>
  )
}

function tag2className(tag) {
  let className = ''
  switch (tag) {
    case 'H2':
      className = 'font-bold'
      break
    case 'H3':
      className = 'ml-4'
      break
    case 'H4':
      className = 'ml-8'
      break
    case 'H5':
      className = 'ml-12'
      break
    case 'H6':
      className = 'ml-16'
      break
    default:
      break
  }

  return className
}
