import {defineArrayMember, defineField, defineType} from 'sanity'
import {faqItems, imageField, orderField, seoField, slugField} from './shared'

const rupees = (n?: number) => (typeof n === 'number' ? `₹${n.toLocaleString('en-IN')}` : 'Price on request')

export const packageType = defineType({
  name: 'package',
  title: 'Tour package',
  type: 'document',
  groups: [
    {name: 'basics', title: 'Basics', default: true},
    {name: 'price', title: 'Price'},
    {name: 'trip', title: 'Itinerary & inclusions'},
    {name: 'dates', title: 'Departure dates'},
    {name: 'photos', title: 'Photos'},
    {name: 'more', title: 'FAQ & Google'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Package name',
      description: 'For example: One Trip, Five Countries',
      type: 'string',
      group: 'basics',
      validation: (rule) => rule.required().max(70),
    }),
    {...slugField('title', 'The page link for this package. Do not change it after the package is live.'), group: 'basics'},
    defineField({
      name: 'kind',
      title: 'Type of package',
      type: 'string',
      group: 'basics',
      options: {
        list: [
          {title: 'International tour', value: 'tour'},
          {title: 'Cruise holiday', value: 'cruise'},
          {title: 'India tour (for visitors from abroad)', value: 'inbound'},
        ],
        layout: 'radio',
      },
      initialValue: 'tour',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'kicker',
      title: 'Small line above the name',
      description: 'For example: Most popular · Best seller',
      type: 'string',
      group: 'basics',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'places',
      title: 'Countries / places covered',
      description: 'Add one place at a time, in travel order. (Ek-ek jagah alag se jodein.)',
      type: 'array',
      group: 'basics',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
      validation: (rule) => rule.required().min(1),
    }),
    defineField({name: 'nights', title: 'Nights', type: 'number', group: 'basics', validation: (rule) => rule.min(0).integer()}),
    defineField({name: 'days', title: 'Days', type: 'number', group: 'basics', validation: (rule) => rule.min(1).integer()}),
    defineField({
      name: 'summary',
      title: 'Short description',
      description: 'Two or three sentences about the trip.',
      type: 'text',
      rows: 4,
      group: 'basics',
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: 'badge',
      title: 'Badge on the photo',
      description: 'Optional. For example: Best seller',
      type: 'string',
      group: 'basics',
      validation: (rule) => rule.max(24),
    }),
    defineField({
      name: 'featured',
      title: 'Show on the home page',
      type: 'boolean',
      group: 'basics',
      initialValue: false,
    }),
    {...orderField, group: 'basics'},

    defineField({
      name: 'price',
      title: 'Offer price (₹)',
      description: 'Numbers only, for example 99999. Leave empty to show "Price on request".',
      type: 'number',
      group: 'price',
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: 'wasPrice',
      title: 'Old price (₹), shown crossed out',
      description: 'Optional.',
      type: 'number',
      group: 'price',
      validation: (rule) =>
        rule.min(0).integer().custom((was, ctx) => {
          const price = (ctx.document as {price?: number} | undefined)?.price
          if (typeof was === 'number' && typeof price === 'number' && was <= price) return 'The old price should be higher than the offer price.'
          return true
        }),
    }),
    defineField({
      name: 'priceTerms',
      title: 'Price terms',
      description: 'Shown under the price so customers know exactly what it means.',
      type: 'object',
      group: 'price',
      fields: [
        defineField({
          name: 'basis',
          title: 'Price is',
          type: 'string',
          options: {list: ['per person', 'per couple', 'per family', 'for the group']},
        }),
        defineField({name: 'sharing', title: 'Room sharing', description: 'For example: twin sharing', type: 'string'}),
        defineField({name: 'validTill', title: 'Price valid till', type: 'date'}),
        defineField({name: 'note', title: 'Any other note', description: 'For example: flights from Delhi', type: 'string', validation: (rule) => rule.max(120)}),
      ],
    }),

    defineField({
      name: 'includes',
      title: 'What is included',
      type: 'array',
      group: 'trip',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'excludes',
      title: 'What is NOT included',
      description: 'For example: visa fees, lunch and dinner, travel insurance.',
      type: 'array',
      group: 'trip',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      description: 'The main places and what travellers do there.',
      type: 'array',
      group: 'trip',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'highlight',
          fields: [
            defineField({name: 'place', title: 'Place', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'text', title: 'What happens here', type: 'text', rows: 2, validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'place', subtitle: 'text'}},
        }),
      ],
    }),
    defineField({
      name: 'itinerary',
      title: 'Day-by-day itinerary',
      description: 'Add one entry for each day. (Har din ke liye ek entry.)',
      type: 'array',
      group: 'trip',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'itineraryDay',
          fields: [
            defineField({name: 'day', title: 'Day number', type: 'number', validation: (rule) => rule.required().min(1).integer()}),
            defineField({name: 'title', title: 'Title', description: 'For example: Arrive in Singapore', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'description', title: 'What happens', type: 'text', rows: 4}),
            defineField({name: 'overnight', title: 'Overnight city', type: 'string'}),
            defineField({name: 'hotel', title: 'Hotel (or similar)', type: 'string'}),
          ],
          preview: {
            select: {day: 'day', title: 'title', overnight: 'overnight'},
            prepare: ({day, title, overnight}) => ({title: `Day ${day ?? '?'} — ${title ?? ''}`, subtitle: overnight ? `Overnight: ${overnight}` : undefined}),
          },
        }),
      ],
    }),

    defineField({
      name: 'departures',
      title: 'Fixed departure dates',
      description: 'Optional. Past dates are hidden on the website automatically.',
      type: 'array',
      group: 'dates',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'departure',
          fields: [
            defineField({name: 'date', title: 'Departure date', type: 'date', validation: (rule) => rule.required()}),
            defineField({name: 'seatsLeft', title: 'Seats left', type: 'number', validation: (rule) => rule.min(0).integer()}),
            defineField({name: 'note', title: 'Note', description: 'For example: from Delhi', type: 'string'}),
          ],
          preview: {
            select: {date: 'date', seats: 'seatsLeft', note: 'note'},
            prepare: ({date, seats, note}) => ({title: date ?? 'No date', subtitle: [typeof seats === 'number' ? `${seats} seats left` : null, note].filter(Boolean).join(' · ')}),
          },
        }),
      ],
    }),

    {...imageField('cover', 'Main photo', 'The big photo on the card and at the top of the page.', true), group: 'photos'},
    defineField({
      name: 'gallery',
      title: 'More photos',
      type: 'array',
      group: 'photos',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Describe this photo',
              type: 'string',
              validation: (rule) => rule.required().max(140).error('Please describe the photo in a few words.'),
            }),
          ],
        }),
      ],
      options: {layout: 'grid'},
    }),

    {...faqItems('faqs', 'Questions about this package'), group: 'more'},
    {...seoField, group: 'more'},
  ],
  orderings: [
    {title: 'Sort order', name: 'order', by: [{field: 'order', direction: 'asc'}]},
    {title: 'Price, low to high', name: 'price', by: [{field: 'price', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', price: 'price', nights: 'nights', days: 'days', media: 'cover', kind: 'kind'},
    prepare: ({title, price, nights, days, media, kind}) => ({
      title,
      subtitle: [kind === 'cruise' ? 'Cruise' : kind === 'inbound' ? 'India tour' : 'Tour', nights && days ? `${nights}N / ${days}D` : null, rupees(price)].filter(Boolean).join(' · '),
      media,
    }),
  },
})
