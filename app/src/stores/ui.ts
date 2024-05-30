import { ref } from 'vue'
import { defineStore } from 'pinia'
import { LOCALSTOARGE_NAMESPACE } from '.'
import type { ColorScheme, Theme } from '@/types/ui'

export const useUIStore = defineStore('ui', () => {
  const THEME_STORAGE_KEY = `${LOCALSTOARGE_NAMESPACE}theme`
  const supportedThemes = ['light', 'dark', 'system'] as const
  const selectedTheme = ref<Theme>('system')
  const colorScheme = ref<ColorScheme>()

  function initTheme() {
    const theme = (localStorage.getItem(THEME_STORAGE_KEY) as Theme) || 'system'
    setTheme(theme)
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', handleColorSchemeChange)
  }

  function setTheme(theme: Theme) {
    selectedTheme.value = theme

    if (
      selectedTheme.value === 'dark' ||
      (selectedTheme.value === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      colorScheme.value = 'dark'
      document.documentElement.classList.add('dark')
      document.documentElement
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', '#0f172a')
    } else {
      colorScheme.value = 'light'
      document.documentElement.classList.remove('dark')
      document.documentElement
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', '#dbeafe')
    }

    if (selectedTheme.value === 'system') {
      localStorage.removeItem(THEME_STORAGE_KEY)
    } else {
      localStorage.setItem(THEME_STORAGE_KEY, selectedTheme.value)
    }
  }

  function handleColorSchemeChange() {
    if (selectedTheme.value !== 'system') {
      return
    }

    setTheme('system')
  }

  return {
    supportedThemes,
    selectedTheme,
    colorScheme,
    initTheme,
    setTheme
  }
})
