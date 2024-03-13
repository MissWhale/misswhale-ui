import { onMounted, ref } from 'vue'

export function useTheme() {
  const theme = ref(localStorage.getItem('theme'))
  onMounted(() => {
    if (theme.value === 'null' || theme.value === null) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        changeTheme('dark')
      } else {
        changeTheme('light')
      }
    }
  })
  const changeTheme = (changeToTheme: string) => {
    localStorage.setItem('muchi-theme', changeToTheme)
    theme.value = changeToTheme
    if (changeToTheme !== 'dark') document.documentElement.classList.toggle('dark')
  }
  const toggleTheme = () => {
    if (theme.value === 'light') changeTheme('dark')
    else changeTheme('light')
  }
  return { theme, toggleTheme }
}
