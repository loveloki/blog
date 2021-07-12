import { useEffect, useState } from 'react'

/**
 * 获取文章目录
 * @returns {array} 目录
 **/
export default function useCatalog() {
  const [catalog, setCatalog] = useState([])

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/catalog.json`)
      .then((data) => data.json())
      .then((arr) => setCatalog(arr))
  }, [])

  return catalog
}
