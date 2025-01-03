export default defineAppConfig({
  // https://ui3.nuxt.dev/getting-started/theme#design-system
  ui: {
    colors: {
      primary: 'indigo',
      neutral: 'slate',
    }
  },
  uiPro: {
    header: {
      slots: {
        root: 'bg-[var(--darkerGradientPoint)]/75 backdrop-blur border-b border-[var(--darkerGradientPoint)] sticky top-0 z-50',
        title: 'shrink-0 font-bold text-xl text-[var(--color-text)] flex items-end gap-1.5',
      }
    }
  }
})
