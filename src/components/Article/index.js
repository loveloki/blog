import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useLocation } from 'react-router-dom'
import './index.css'

function Article() {
  const [markdownContent, setMarkdownContent] = useState(null)
  const location = useLocation()
  const [, , year, month, name] = location.pathname.split('/')

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/article/${year}/${month}/${name}.md`)
      .then((data) => data.text())
      .then((data) => setMarkdownContent(data))
  }, [])

  return <ReactMarkdown className="markdown-body">{markdownContent}</ReactMarkdown>
}

export default Article
