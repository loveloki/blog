import { useEffect, useRef, useState } from 'react'
import './index.css'

export default function Nav(markdownContent) {
  const [nav, setNav] = useState(null)
  const NavEl = useRef(null)
  const isClick = useRef(false)

  useEffect(() => {
    let timer

    window.addEventListener('scroll', scrollingElement)

    function scrollingElement() {
      if (isClick.current) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        // 无滚动事件触发，认为停止滚动了
        const prevEL = NavEl.current && NavEl.current.querySelector('.active')

        // 如果是点击
        // 结束需要设置标志位为 false
        if (isClick.current) {
          isClick.current = false
          return
        }

        // 如果是滚动
        // 上次有选择的需要清除
        if (prevEL) {
          NavEl.current.classList.remove('active')
        }

        const headers = document.querySelector('.markdown-body').querySelectorAll('h2,h3,h4,h5,h6')
        const currentTop = document.scrollingElement.scrollTop

        let selectedNode

        let arr = []

        // 需要加上 header 的高度
        headers.forEach((Node) => arr.push(Node.offsetTop + 64))

        if (currentTop > arr[0]) {
          for (let i = 0; i < arr.length; i++) {
            const top = arr[i]

            // 如果滚动项的 top 小于当前页面的 top
            if (top < currentTop) {
              selectedNode = headers[i]
            } else {
              break
            }
          }

          // 清除之前的 active 样式
          if (NavEl.current.querySelector('.active')) {
            NavEl.current.querySelector('.active').classList.remove('active')
          }

          if (selectedNode) {
            NavEl.current.querySelector(`[href='#${selectedNode.id}']`).parentNode.classList.add('active')
          }
        } else {
          // 清除之前的 active 样式
          if (NavEl.current.querySelector('.active')) {
            NavEl.current.querySelector('.active').classList.remove('active')
          }
        }
      }, 100)
    }

    return () => window.removeEventListener('scroll', scrollingElement)
  }, [])

  useEffect(() => {
    if (!markdownContent) {
      return
    }

    function handleClickMenu(Node) {
      // 设置点击
      isClick.current = true
      // 移除上一个激活状态
      const prevEL = NavEl.current.querySelector('.active')
      if (prevEL) {
        prevEL.classList.remove('active')
      }

      // 添加新的
      Node.classList.add('active')
    }

    const headers = document.querySelector('.markdown-body').querySelectorAll('h2,h3,h4,h5,h6')
    const nav = Array.prototype.map.call(headers, (Node) => (
      <li
        className={tag2className(Node.tagName) + ' whitespace-nowrap overflow-hidden overflow-ellipsis'}
        title={Node.textContent}
        key={Node.id}
        onClickCapture={(e) => handleClickMenu(e.currentTarget)}
      >
        <a href={`#${Node.id}`}>{Node.textContent}</a>
      </li>
    ))

    setNav(nav)

    return () => {}
  }, [markdownContent])

  return (
    <nav ref={NavEl} className="fixed w-64 top-5 ml-11">
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
