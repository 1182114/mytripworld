import {defineArrayMember, defineField, defineType} from 'sanity'
import {faqItems, imageField, seoField} from './shared'

const titledPoints = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: 'array',
    of: [
      defineArrayMember({
        type: 'object',
        name: 'point',
        fields: [
          defineField({name: 'icon', title: 'Icon', type: 'string', options: {list: ['car', 'plane', 'users', 'shield', 'trophy', 'globe', 'home']}}),
          defineField({name: 'value', title: 'Big number or word (optional)', type: 'string'}),
          defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
          defineField({name: 'text', title: 'Text', type: 'text', rows: 2}),
        ],
        preview: {select: {title: 'title', subtitle: 'text'}},
      }),
    ],
  })

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Top section', default: true},
    {name: 'sections', title: 'Other sections'},
  ],
  fields: [
    defineField({name: 'eyebrow', title: 'Small line above the heading', type: 'string', group: 'hero'}),
    defineField({
      name: 'heading',
      title: 'Main heading (H1)',
      description: 'The most important line for Google. Keep the words customers search for.',
      type: 'string',
      group: 'hero',
      validation: (rule) => rule.required().max(70),
    }),
    defineField({name: 'headingHighlight', title: 'Words to underline in yellow', description: 'Must be part of the main heading, e.g. Tour Packages', type: 'string', group: 'hero'}),
    defineField({name: 'intro', title: 'Line under the heading', type: 'text', rows: 3, group: 'hero', validation: (rule) => rule.required().max(260)}),
    {...imageField('heroImage', 'Background photo', 'A wide, bright landscape photo.', true), group: 'hero'},

    {...titledPoints('stats', 'Numbers strip', 'Three short facts. Use only real numbers.'), group: 'sections'},
    defineField({name: 'packagesEyebrow', title: 'Packages section: small line', type: 'string', group: 'sections'}),
    defineField({name: 'packagesHeading', title: 'Packages section: heading', type: 'string', group: 'sections'}),
    defineField({name: 'packagesIntro', title: 'Packages section: text', type: 'text', rows: 2, group: 'sections'}),
    defineField({name: 'whyHeading', title: '"Why choose us": heading', type: 'string', group: 'sections'}),
    {...titledPoints('whyPoints', '"Why choose us": points'), group: 'sections'},
    defineField({name: 'aboutEyebrow', title: 'About block: small line', type: 'string', group: 'sections'}),
    defineField({name: 'aboutHeading', title: 'About block: heading', type: 'string', group: 'sections'}),
    defineField({
      name: 'aboutBody',
      title: 'About block: text',
      description: 'You can add links to packages by selecting words and pressing the link button.',
      type: 'array',
      group: 'sections',
      of: [defineArrayMember({type: 'block', styles: [{title: 'Normal', value: 'normal'}], lists: [], marks: {decorators: [{title: 'Bold', value: 'strong'}], annotations: [{name: 'link', type: 'object', title: 'Link', fields: [{name: 'href', type: 'string', title: 'Link (e.g. /tour-packages/ or https://…)'}]}]}})],
    }),
    defineField({name: 'cruiseEyebrow', title: 'Cruise banner: small line', type: 'string', group: 'sections'}),
    defineField({name: 'cruiseHeading', title: 'Cruise banner: heading', type: 'string', group: 'sections'}),
    defineField({name: 'cruiseText', title: 'Cruise banner: text', type: 'text', rows: 2, group: 'sections'}),
    {...imageField('cruiseImage', 'Cruise banner: photo'), group: 'sections'},
    defineField({name: 'ctaHeading', title: 'Closing banner: heading', type: 'string', group: 'sections'}),
    {...imageField('ctaImage', 'Closing banner: photo'), group: 'sections'},
  ],
  preview: {prepare: () => ({title: 'Home page'})},
})

export const pageContentType = defineType({
  name: 'pageContent',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'key',
      title: 'Which page',
      type: 'string',
      readOnly: true,
      options: {
        list: [
          {title: 'About us', value: 'about'},
          {title: 'Tour packages (list)', value: 'tourPackages'},
          {title: 'Cruise holidays', value: 'cruise'},
          {title: 'Gallery', value: 'gallery'},
          {title: 'Contact', value: 'contact'},
          {title: 'India tours', value: 'india'},
          {title: 'Departure cities', value: 'departureCities'},
        ],
      },
    }),
    defineField({name: 'eyebrow', title: 'Small line above the heading', type: 'string'}),
    defineField({name: 'heading', title: 'Main heading (H1)', type: 'string', validation: (rule) => rule.required().max(90)}),
    defineField({name: 'intro', title: 'Line under the heading', type: 'text', rows: 3, validation: (rule) => rule.max(320)}),
    imageField('heroImage', 'Top photo'),
    defineField({name: 'bodyHeading', title: 'Section heading', type: 'string'}),
    defineField({name: 'body', title: 'Section paragraphs', description: 'One entry per paragraph.', type: 'array', of: [defineArrayMember({type: 'text', rows: 4})]}),
    defineField({name: 'bullets', title: 'Bullet points', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    defineField({name: 'cardsHeading', title: 'Cards heading', type: 'string'}),
    titledPoints('cards', 'Cards'),
    defineField({name: 'photos', title: 'Photos on this page', type: 'array', of: [defineArrayMember({type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Describe this photo', type: 'string', validation: (rule) => rule.required()})]})], options: {layout: 'grid'}}),
    faqItems(),
    seoField,
  ],
  preview: {select: {title: 'heading', key: 'key', media: 'heroImage'}, prepare: ({title, key, media}) => ({title: title ?? key, subtitle: key, media})},
})

export const legalPageType = defineType({
  name: 'legalPage',
  title: 'Legal page',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: 'Web address', type: 'slug', readOnly: true, validation: (rule) => rule.required()}),
    defineField({name: 'description', title: 'Search description', type: 'text', rows: 2, validation: (rule) => rule.max(160)}),
    defineField({
      name: 'body',
      title: 'Text',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}, {title: 'Heading', value: 'h2'}],
          lists: [{title: 'Bullets', value: 'bullet'}],
          marks: {decorators: [{title: 'Bold', value: 'strong'}], annotations: [{name: 'link', type: 'object', title: 'Link', fields: [{name: 'href', type: 'string', title: 'Link'}]}]},
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {select: {title: 'title'}},
})
