import {defineField} from 'sanity'

/** Image with compulsory alt text (needed for Google and screen readers). */
export const imageField = (name: string, title: string, description?: string, required = false) =>
  defineField({
    name,
    title,
    description,
    type: 'image',
    options: {hotspot: true},
    fields: [
      defineField({
        name: 'alt',
        title: 'Describe this photo',
        description: 'One short line saying what is in the photo. (Photo mein kya dikh raha hai, ek line mein.)',
        type: 'string',
        validation: (rule) => rule.required().max(140).error('Please describe the photo in a few words.'),
      }),
    ],
    validation: required ? (rule) => rule.required() : undefined,
  })

/** Search-result title and description for a page. */
export const seoField = defineField({
  name: 'seo',
  title: 'Google search settings',
  description: 'How this page appears in Google. Leave empty to use the automatic version.',
  type: 'object',
  options: {collapsible: true, collapsed: true},
  fields: [
    defineField({
      name: 'title',
      title: 'Search title',
      description: 'Up to 50 characters. " | My Trip World" is added automatically.',
      type: 'string',
      validation: (rule) => rule.max(50).warning('Longer titles get cut off in Google.'),
    }),
    defineField({
      name: 'description',
      title: 'Search description',
      description: 'One or two sentences, up to 160 characters.',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160).warning('Longer descriptions get cut off in Google.'),
    }),
  ],
})

export const faqItems = (name = 'faqs', title = 'Questions & answers') =>
  defineField({
    name,
    title,
    type: 'array',
    of: [
      {
        type: 'object',
        name: 'faqItem',
        fields: [
          defineField({name: 'question', title: 'Question', type: 'string', validation: (rule) => rule.required()}),
          defineField({name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (rule) => rule.required()}),
        ],
        preview: {select: {title: 'question', subtitle: 'answer'}},
      },
    ],
  })

export const orderField = defineField({
  name: 'order',
  title: 'Sort order',
  description: 'Lower numbers show first. (Chhota number pehle dikhega.)',
  type: 'number',
  initialValue: 100,
})

export const slugField = (source: string, description: string) =>
  defineField({
    name: 'slug',
    title: 'Web address',
    description,
    type: 'slug',
    options: {source, maxLength: 80},
    validation: (rule) => rule.required().error('Click "Generate" to create the web address.'),
  })
