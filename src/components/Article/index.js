import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useLocation } from 'react-router-dom'
import slug from 'remark-slug'
import useCatalog from '../../hooks/catalog'
import useDocumentTitle from '../../hooks/document-title'
import './index.css'
import Nav from './Nav'

function Article() {
  const [markdownContent, setMarkdownContent] = useState(null)
  const location = useLocation()
  const [, , year, month, name] = location.pathname.split('/')
  const catalogArray = useCatalog()

  const title = catalogArray.find((item) => item.name === name)?.title
  useDocumentTitle(title || '文章加载中...')

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/article/${year}/${month}/${name}.md`)
      .then((data) => data.text())
      .then((data) => setMarkdownContent(data))
  }, [year, month, name])

  return (
    <>
      <aside className="absolute h-full transform -translate-x-full w-80 -left-3">
        <Nav markdownContent={markdownContent} />
      </aside>
      <ReactMarkdown className="markdown-body" remarkPlugins={[slug]}>
        {markdownContent}
      </ReactMarkdown>
    </>
  )
}

export default Article
