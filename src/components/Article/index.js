import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import './index.css'

function Article(props) {
  const { year, month, title } = props
  const [markdownContent, setMarkdownContent] = useState(null)

  useEffect(() => {
    fetch(`http://127.0.0.1:4523/mock/395561/article/${year}/${month}/${title}`)
      .then((data) => data.json())
      .then((data) => setMarkdownContent(data.data))
  }, [])

  return <ReactMarkdown className="markdown-body my-4">{markdownContent}</ReactMarkdown>
}

export default Article
