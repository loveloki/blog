const modules = import.meta.glob('/**/*.md', { as: 'raw' })
const articles = new Map()

for (const path in modules) {
  if (modules.hasOwnProperty(path)) {
    modules[path]().then((mod) => {
      const filename = path.split('/').pop()?.slice(0, -3)

      articles.set(filename, mod)
    })
  }
}

export default articles
