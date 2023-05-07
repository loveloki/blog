import { useEffect, useState } from 'react'

export interface Post {
  id: string
  title: string
  desc: string
  tags: Array<string>
}

const path = '/catalog.json'

const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    fetch(path)
      .then((res) => res.json())
      .then((json) => {
        setPosts(json)
      })
      .catch((e) => {
        console.warn(e)
        setPosts([])
      })
  }, [])

  return posts
}

export default usePosts
