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
  filters: z.string().refine(value => value === 'option-2', {
    message: 'Select Option 2'
  })
})

type Schema = z.input<typeof schema>

const state = reactive<Partial<Schema>>({})

const form = useTemplateRef('form')

const filters = ref([
  {
    label: 'Vivid Pink',
    value: 'bug',
    chip: {
      color: 'vividPink' as const
    }
  },
  {
    label: 'Royal Purple',
    value: 'feature',
    chip: {
      color: 'royalPurple' as const
    }
  },
  {
    label: 'Deep Blue',
    value: 'enhancement',
    chip: {
      color: 'deepBlue' as const
    }
  },
  {
    label: 'Golden Orange',
    value: 'bug',
    chip: {
      color: 'goldenOrange' as const
    }
  },
  {
    label: 'Tropical Green',
    value: 'feature',
    chip: {
      color: 'tropicalGreen' as const
    }
  },
  {
    label: 'Muted Blue',
    value: 'enhancement',
    chip: {
      color: 'mutedBlue' as const
    }
  },
  {
    label: 'Earthy Lime',
    value: 'bug',
    chip: {
      color: 'earthyLime' as const
    }
  },
  {
    label: 'Lavender Purple',
    value: 'feature',
    chip: {
      color: 'lavenderPurple' as const
    }
  },
  {
    label: 'Cool Gray',
    value: 'enhancement',
    chip: {
      color: 'coolGray' as const
    }
  },
  {
    label: 'Rusty Amber',
    value: 'bug',
    chip: {
      color: 'rustyAmber' as const
    }
  },
  {
    label: 'Soft Blue',
    value: 'feature',
    chip: {
      color: 'softBlue' as const
    }
  },
  {
    label: 'Blush Red',
    value: 'enhancement',
    chip: {
      color: 'blushRed' as const
    }
  }
])

async function onSubmit(event: FormSubmitEvent<any>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data)
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
                      <UButton type="submit">Generate</UButton>
                      <UButton variant="outline" @click="form?.clear()">Clear</UButton>
                      <UButton @click="downloadImage" v-if="generatedImage">Download</UButton>
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
