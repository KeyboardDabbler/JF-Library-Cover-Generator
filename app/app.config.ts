export default defineAppConfig({
  // https://ui3.nuxt.dev/getting-started/theme#design-system
  ui: {
    colors: {
      primary: 'indigo',
      neutral: 'slate'
    },
    chip: {
      variants: {
        color: {
          vividPink: 'bg-[var(--duotone-vivid-pink-secondary)]',
          royalPurple: 'bg-[var(--duotone-royal-purple-secondary)]',
          deepBlue: 'bg-[var(--duotone-deep-blue-secondary)]',
          goldenOrange: 'bg-[var(--duotone-golden-orange-secondary)]',
          tropicalGreen: 'bg-[var(--duotone-tropical-green-secondary)]',
          mutedBlue: 'bg-[var(--duotone-muted-blue-secondary)]',
          earthyLime: 'bg-[var(--duotone-earthy-lime-secondary)]',
          lavenderPurple: 'bg-[var(--duotone-lavender-purple-secondary)]',
          coolGray: 'bg-[var(--duotone-cool-gray-secondary)]',
          rustyAmber: 'bg-[var(--duotone-rusty-amber-secondary)]',
          softBlue: 'bg-[var(--duotone-soft-blue-secondary)]',
          blushRed: 'bg-[var(--duotone-blush-red-secondary)]'
        }
      }
    }
  },
  uiPro: {
    header: {
      slots: {
        root: 'bg-[var(--darkerGradientPoint)]/75 backdrop-blur border-b border-[var(--darkerGradientPoint)] sticky top-0 z-50',
        title: 'shrink-0 font-bold text-xl text-[var(--color-text)] flex items-end gap-1.5'
      }
    }
  }
})
