import { useEffect, useState } from 'react'

export interface Item {
  id: string
  title: string
  desc: string
  tags: Array<string>
}

export type ListItemType = 'snippets' | 'posts'

const useList = (type: ListItemType) => {
  const path = '/' + type + '.json'
  const [item, setItem] = useState<Item[]>([])

  useEffect(() => {
    fetch(path)
      .then((res) => res.json())
      .then((json) => {
        setItem(json)
      })
      .catch((e) => {
        console.warn(e)
        setItem([])
      })
  }, [])

  return item
}

export default useList
