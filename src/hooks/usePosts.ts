import { useEffect, useState } from 'react'

const usePosts = () => {
  const [posts, setPosts] = useState<{ name: string }[]>([])

  useEffect(() => {
    setPosts([{ name: 'test' }])
  }, [])

  return posts
}

export default usePosts
