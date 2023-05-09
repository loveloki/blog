
type Theme = 'ayu-light'

function useTheme(theme: Theme) {
  const html = document.querySelector('html')

  if (html) {
    html.dataset.theme= theme
  }
}


export default useTheme
