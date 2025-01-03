export default defineAppConfig({
  // https://ui3.nuxt.dev/getting-started/theme#design-system
  ui: {
    colors: {
      primary: 'indigo',
      neutral: 'slate',
    },
    chip: {
      variants: {
        color: {
          purple: 'bg-[var(--duotone-purple-primary)]',
          grayBlue: 'bg-[var(--duotone-gray-blue-primary)]',
          orangeRed: 'bg-[var(--duotone-orange-red-primary)]',
          boldRed: 'bg-[var(--duotone-bold-red-primary)]',
          darkBlue: 'bg-[var(--duotone-dark-blue-primary)]',
          blueGradient: 'bg-[var(--duotone-blue-gradient-primary)]',
          warmGray: 'bg-[var(--duotone-warm-gray-primary)]',
          softBlue: 'bg-[var(--duotone-soft-blue-primary)]',
          green: 'bg-[var(--duotone-green-primary)]'
        }
      }
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
