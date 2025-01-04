<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  url: z.string()
    .url() // Validates it's a URL
    .regex(
      /^https:\/\/image\.tmdb\.org\/t\/p\/original\/[a-zA-Z0-9_-]+\.(jpg|png|jpeg)$/,
      'URL must match the pattern: https://image.tmdb.org/t/p/original/{filename}.{ext}'
    ),
  text: z.string().max(23),
  filters: z.string().refine(
    value => ['vividPink', 'royalPurple', 'deepBlue', 'goldenOrange', 'tropicalGreen', 'mutedBlue', 'earthyLime', 'lavenderPurple', 'coolGray', 'rustyAmber', 'softBlue', 'blushRed'].includes(value),
    { message: 'Please select a filter option' }
  )
})

const toast = useToast()

type Schema = z.input<typeof schema>

const state = reactive<Partial<Schema>>({})

const form = useTemplateRef('form')

const duotones = {
  vividPink: ['var(--duotone-vivid-pink-primary)', 'var(--duotone-vivid-pink-secondary)'],
  royalPurple: ['var(--duotone-royal-purple-primary)', 'var(--duotone-royal-purple-secondary)'],
  deepBlue: ['var(--duotone-deep-blue-primary)', 'var(--duotone-deep-blue-secondary)'],
  goldenOrange: ['var(--duotone-golden-orange-primary)', 'var(--duotone-golden-orange-secondary)'],
  tropicalGreen: ['var(--duotone-tropical-green-primary)', 'var(--duotone-tropical-green-secondary)'],
  mutedBlue: ['var(--duotone-muted-blue-primary)', 'var(--duotone-muted-blue-secondary)'],
  earthyLime: ['var(--duotone-earthy-lime-primary)', 'var(--duotone-earthy-lime-secondary)'],
  lavenderPurple: ['var(--duotone-lavender-purple-primary)', 'var(--duotone-lavender-purple-secondary)'],
  coolGray: ['var(--duotone-cool-gray-primary)', 'var(--duotone-cool-gray-secondary)'],
  rustyAmber: ['var(--duotone-rusty-amber-primary)', 'var(--duotone-rusty-amber-secondary)'],
  softBlue: ['var(--duotone-soft-blue-primary)', 'var(--duotone-soft-blue-secondary)'],
  blushRed: ['var(--duotone-blush-red-primary)', 'var(--duotone-blush-red-secondary)']
}

const filters = ref([
  {
    label: 'Vivid Pink',
    value: 'vividPink',
    chip: {
      color: 'vividPink' as const
    }
  },
  {
    label: 'Royal Purple',
    value: 'royalPurple',
    chip: {
      color: 'royalPurple' as const
    }
  },
  {
    label: 'Deep Blue',
    value: 'deepBlue',
    chip: {
      color: 'deepBlue' as const
    }
  },
  {
    label: 'Golden Orange',
    value: 'goldenOrange',
    chip: {
      color: 'goldenOrange' as const
    }
  },
  {
    label: 'Tropical Green',
    value: 'tropicalGreen',
    chip: {
      color: 'tropicalGreen' as const
    }
  },
  {
    label: 'Muted Blue',
    value: 'mutedBlue',
    chip: {
      color: 'mutedBlue' as const
    }
  },
  {
    label: 'Earthy Lime',
    value: 'earthyLime',
    chip: {
      color: 'earthyLime' as const
    }
  },
  {
    label: 'Lavender Purple',
    value: 'lavenderPurple',
    chip: {
      color: 'lavenderPurple' as const
    }
  },
  {
    label: 'Cool Gray',
    value: 'coolGray',
    chip: {
      color: 'coolGray' as const
    }
  },
  {
    label: 'Rusty Amber',
    value: 'rustyAmber',
    chip: {
      color: 'rustyAmber' as const
    }
  },
  {
    label: 'Soft Blue',
    value: 'softBlue',
    chip: {
      color: 'softBlue' as const
    }
  },
  {
    label: 'Blush Red',
    value: 'blushRed',
    chip: {
      color: 'blushRed' as const
    }
  }
])

function resolveCSSVariable(variable) {
  const tempElement = document.createElement('div')
  document.body.appendChild(tempElement)
  tempElement.style.setProperty('--temp-variable', variable)

  const computedValue = getComputedStyle(tempElement).getPropertyValue('--temp-variable').trim()
  document.body.removeChild(tempElement)

  return computedValue
}

async function onSubmit(event: FormSubmitEvent<any>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'primary' })
  console.log(event.data)
  console.log(event.data.url)
  console.log(event.data.filters)
  console.log(event.data.text)

  const [colorVar1, colorVar2] = duotones[event.data.filters]
  const color1 = resolveCSSVariable(colorVar1).replace('#', '')
  const color2 = resolveCSSVariable(colorVar2).replace('#', '')

  const generatedURL = event.data.url.replace(
    '/original/',
    `/w1280_filter(duotone,${color1},${color2})/`
  )
  console.log('Generated URL:', generatedURL)

  const canvas = document.querySelector('canvas') as HTMLCanvasElement | null
  if (!canvas) {
    console.error('Canvas element not found')
    return
  }

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    console.error('Unable to get context for the canvas')
    return
  }

  const backdrop = new Image()
  backdrop.crossOrigin = 'Anonymous'
  backdrop.src = generatedURL

  backdrop.onload = () => {
    canvas.width = backdrop.naturalWidth
    canvas.height = backdrop.naturalHeight

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(backdrop, 0, 0, canvas.width, canvas.height)

    ctx.font = '900 72pt Inter'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(event.data.text, canvas.width / 2, canvas.height / 2)

    this.generatedImage = canvas.toDataURL('image/png')
  }
}
</script>

<template>
  <UApp>
    <Html
      class="scheme-only-dark scrollbar-thin"
      dir="ltr"
    >
      <Body class="antialiased duration-300 transition-colors">
        <NuxtLoadingIndicator />
        <div class="flex flex-col min-h-screen">
          <UHeader title="Jellyfin Library Cover Generator" />
          <div class="flex-1 w-full flex flex-col">
            <div class="relative flex-1 flex flex-col mx-auto max-w-8xl w-full h-full">
              <div class="px-4 sm:px-6 lg:px-8">
                <UForm
                  ref="form"
                  :state="state"
                  :schema="schema"
                  class="w-full max-w-[960px] mx-auto"
                  @submit="onSubmit"
                >
                  <div class="grid grid-cols-1 gap-4">
                    <UFormField
                      label="TMDB URL"
                      name="url"
                    >
                      <UInput
                        v-model="state.url"
                        size="xl"
                        placeholder="https://image.tmdb.org/t/p/original/hT2yA8oaKVjXHjPWlmy08fdPz9p.jpg"
                        class="w-full"
                      />
                    </UFormField>

                    <UFormField
                      label="Cover Text"
                      name="text"
                    >
                      <UInput
                        v-model="state.text"
                        size="xl"
                        placeholder="Movies - General"
                        class="w-full"
                      />
                    </UFormField>

                    <UFormField
                      label="Filter Color"
                      name="filters"
                    >
                      <USelect
                        v-model="state.filters"
                        size="xl"
                        :items="filters"
                        class="w-full"
                      />
                    </UFormField>

                    <div class="flex gap-2 mt-8">
                      <UButton type="submit">
                        Generate
                      </UButton>
                      <UButton
                        variant="outline"
                        @click="() => { form?.clear(); state.url = ''; state.text = ''; state.filters = 'null'; }"
                      >
                        Clear
                      </UButton>
                      <UButton>
                        Download
                      </UButton>
                    </div>
                  </div>

                  <canvas
                    ref="canvas"
                    class="border mt-10 max-w-[960px] max-h-[540px] w-full h-auto"
                  />
                </UForm>
              </div>
            </div>
          </div>
          <UFooter>
            <p class="my-3 text-dimText">
              Made with ❤️ by <NuxtLink
                to="https://github.com/KeyboardDabbler"
                class="text-yellow-400 font-bold"
              >
                keyboardDabbler</NuxtLink>
            </p>
          </UFooter>
        </div>
      </Body>
    </Html>
  </UApp>
</template>
