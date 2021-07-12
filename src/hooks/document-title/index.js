import { useEffect } from 'react'

/**
 * 修改页面 title
 * @param {string} title 要设置的新title
 **/
export default function useDocumentTitle(title) {
  useEffect(() => {
    const previous = document.title
    document.title = title

    return () => {
      document.title = previous
    }
  }, [title])
}
