import useCopy from '@/hooks/useCopy'
import ReactMarkdown from 'react-markdown'
import { MouseEvent } from 'react'
import './Markdown.css'
import { ReactComponent as CopyIcon } from "@/svg/copy.svg";

interface componentFunction {
  [x: string]: any
}

function handleCopy(e: MouseEvent) {
  const target = (e.target as HTMLDivElement)

  useCopy(target.previousElementSibling as HTMLPreElement)
}

const components = {
  pre: ({ node, ...props }: componentFunction) => (
    <div className="code-box">
      <pre {...props} />
      <div className="copy-btn" onClick={handleCopy}>
        <CopyIcon />
      </div>
    </div>
  ),
}

function Markdown({ text }: { text: string }) {
  return <ReactMarkdown components={components}>{text}</ReactMarkdown>
}

export default Markdown
