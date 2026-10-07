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
    {name: 'stops', title: 'Destinations'},
    {name: 'trip', title: 'Itinerary & inclusions'},
    {name: 'policies', title: 'Payment, visa & terms'},
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
    defineField({name: 'durationText', title: 'Duration (in words)', description: 'Optional. Only when Nights / Days does not describe the trip, e.g. 7 Nights Switzerland + 7-Night Cruise.', type: 'string', group: 'basics', validation: (rule) => rule.max(60)}),
    defineField({name: 'departureAirports', title: 'Departure airports', description: 'One city per entry, e.g. New Delhi. Shown at the top of the package page.', type: 'array', group: 'basics', of: [defineArrayMember({type: 'string'})]}),
    defineField({name: 'countriesCount', title: 'Number of countries', description: 'Optional. Shown as a fact card, e.g. 3 Countries.', type: 'number', group: 'basics', validation: (rule) => rule.min(1).integer()}),
    defineField({name: 'internationalFlights', title: 'International flights included', type: 'number', group: 'basics', validation: (rule) => rule.min(0).integer()}),
    defineField({name: 'domesticFlights', title: 'Domestic flights included', type: 'number', group: 'basics', validation: (rule) => rule.min(0).integer()}),
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
      name: 'tagline',
      title: 'Tagline under the name',
      description: 'Optional. One line shown at the top of the package page.',
      type: 'string',
      group: 'basics',
      validation: (rule) => rule.max(140),
    }),
    defineField({
      name: 'overview',
      title: 'About this journey (longer text)',
      description: 'Optional. One paragraph per entry, shown on the package page. If empty, the short description is used.',
      type: 'array',
      group: 'basics',
      of: [defineArrayMember({type: 'text', rows: 3})],
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
      name: 'stops',
      title: 'Destination cards',
      description: 'One card per place on the trip, each with a large photo. (Har jagah ke liye ek card.)',
      type: 'array',
      group: 'stops',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stop',
          fields: [
            defineField({name: 'name', title: 'Place', description: 'For example: Boracay', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'country', title: 'Country', type: 'string'}),
            defineField({name: 'nights', title: 'Nights here', type: 'number', validation: (rule) => rule.min(0).integer()}),
            defineField({
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: {hotspot: true},
              fields: [defineField({name: 'alt', title: 'Describe this photo', type: 'string', validation: (rule) => rule.required().max(140)})],
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'summary', title: 'One or two lines about this place', type: 'text', rows: 2, validation: (rule) => rule.max(220)}),
            defineField({name: 'experiences', title: 'Experiences here', description: 'What travellers do in this place. Only list what is really part of the package.', type: 'array', of: [defineArrayMember({type: 'string'})]}),
          ],
          preview: {select: {title: 'name', subtitle: 'country', media: 'image'}},
        }),
      ],
    }),
    defineField({
      name: 'highlightPoints',
      title: 'Package highlights',
      description: 'Short bullet points — the best things about this package.',
      type: 'array',
      group: 'trip',
      of: [defineArrayMember({type: 'string'})],
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
      title: 'Place-by-place highlights (older style)',
      description: 'Used on packages that do not have destination cards. New packages should use the Destinations tab instead.',
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

    defineField({name: 'paymentPolicy', title: 'Payment policy', description: 'One point per line, e.g. booking amount, when the balance is due.', type: 'array', group: 'policies', of: [defineArrayMember({type: 'string'})]}),
    defineField({name: 'visaInfo', title: 'Visa information', type: 'array', group: 'policies', of: [defineArrayMember({type: 'string'})]}),
    defineField({name: 'importantInfo', title: 'Important information', type: 'array', group: 'policies', of: [defineArrayMember({type: 'string'})]}),
    defineField({
      name: 'moreInfo',
      title: 'Extra fold-away sections',
      description: 'Optional. For example: Cruise exclusions.',
      type: 'array',
      group: 'policies',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'infoSection',
          fields: [
            defineField({name: 'title', title: 'Heading', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'items', title: 'Points', type: 'array', of: [defineArrayMember({type: 'string'})]}),
          ],
          preview: {select: {title: 'title'}},
        }),
      ],
    }),
    defineField({name: 'addOns', title: 'Optional add-ons note', description: 'Optional. Shown in a small box with an "Ask About Activities" button.', type: 'text', rows: 2, group: 'trip'}),
    defineField({name: 'itineraryHeading', title: 'Heading above the day-by-day itinerary', description: 'Optional. For example: MSC Cruise itinerary.', type: 'string', group: 'trip'}),
    defineField({name: 'terms', title: 'Terms & Conditions', description: 'Shown inside a closed "Terms & Conditions" box on the page. One paragraph or point per entry.', type: 'array', group: 'policies', of: [defineArrayMember({type: 'text', rows: 3})]}),
    defineField({name: 'ctaHeading', title: 'Heading of the booking box at the end of the page', description: 'Optional. For example: Ready for Your Philippines Adventure?', type: 'string', group: 'more', validation: (rule) => rule.max(80)}),
    defineField({name: 'ctaText', title: 'Line under that heading', type: 'string', group: 'more', validation: (rule) => rule.max(160)}),
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
