import {defineArrayMember, defineField, defineType} from 'sanity'
import {faqItems, imageField, orderField, seoField, slugField} from './shared'

export const destinationType = defineType({
  name: 'destination',
  title: 'Destination',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Destination name', type: 'string', validation: (rule) => rule.required()}),
    slugField('name', 'Used for the destination page link.'),
    imageField('image', 'Photo', 'Shown in the Popular Destinations grid.', true),
    defineField({name: 'showOnHome', title: 'Show on the home page', type: 'boolean', initialValue: true}),
    defineField({name: 'tileSize', title: 'Tile size on the home page', type: 'string', options: {list: [{title: 'Normal', value: 'normal'}, {title: 'Wide', value: 'wide'}, {title: 'Large', value: 'large'}], layout: 'radio'}, initialValue: 'normal'}),
    defineField({
      name: 'intro',
      title: 'About this destination',
      description: 'A few paragraphs shown on this destination’s page. If you leave it empty, the page simply lists the packages that include this destination.',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 4})],
    }),
    seoField,
    orderField,
  ],
  orderings: [{title: 'Sort order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', media: 'image'}},
})

export const cityType = defineType({
  name: 'city',
  title: 'Departure city',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'City name', description: 'For example: Delhi NCR', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'shortName', title: 'Short name', description: 'For example: Delhi', type: 'string', validation: (rule) => rule.required()}),
    slugField('name', 'For example: international-tour-packages-from-delhi. Do not change it after the page is live.'),
    defineField({name: 'state', title: 'State', type: 'string'}),
    defineField({name: 'airport', title: 'Airport travellers fly from', description: 'If the city has no international airport, write the one they use, e.g. Indira Gandhi International Airport, Delhi', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'code', title: 'Airport code', description: 'Three letters, e.g. DEL', type: 'string', validation: (rule) => rule.required().length(3).uppercase()}),
    defineField({name: 'area', title: 'Areas covered', description: 'For example: Delhi, Gurugram, Noida, Faridabad and Ghaziabad', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'featured', title: 'Popular city (show on the home page and footer)', type: 'boolean', initialValue: false}),
    defineField({name: 'hasPage', title: 'Give this city its own page', description: 'Turn on only when you have written an introduction that is true and specific to this city. If off, the city is simply listed under "We also serve".', type: 'boolean', initialValue: true}),
    defineField({
      name: 'intro',
      title: 'Introduction paragraphs',
      description: 'Write what is true and specific for this city. Do not copy another city.',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 4})],
      validation: (rule) => rule.custom((v, ctx) => ((ctx.document as {hasPage?: boolean} | undefined)?.hasPage !== false && !(v as unknown[] | undefined)?.length ? 'A city with its own page needs an introduction.' : true)),
    }),
    defineField({name: 'notes', title: 'Good-to-know points', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    defineField({name: 'officeAnswer', title: 'Answer to "Do you have an office in this city?"', description: 'Be honest: offices are only where you really have one.', type: 'text', rows: 3, validation: (rule) => rule.custom((v, ctx) => ((ctx.document as {hasPage?: boolean} | undefined)?.hasPage !== false && !v ? 'Please answer this for cities with their own page.' : true))}),
    faqItems('faqs', 'Extra questions for this city'),
    seoField,
    orderField,
  ],
  orderings: [{title: 'Sort order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', state: 'state', code: 'code', hasPage: 'hasPage'}, prepare: ({title, state, code, hasPage}) => ({title, subtitle: [state, code, hasPage === false ? 'listed only' : 'has page'].filter(Boolean).join(' · ')})},
})

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Customer review',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Customer name', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'trip', title: 'Which trip', description: 'For example: Malaysia tour', type: 'string'}),
    defineField({name: 'text', title: 'What they said', description: 'Use the customer’s real words. Never write a review yourself. (Sirf asli review daalein.)', type: 'text', rows: 5, validation: (rule) => rule.required().min(20).max(700)}),
    defineField({name: 'rating', title: 'Stars', type: 'number', options: {list: [5, 4, 3, 2, 1]}, validation: (rule) => rule.min(1).max(5).integer()}),
    defineField({name: 'source', title: 'Where the review came from', type: 'string', options: {list: [{title: 'Told us directly', value: 'direct'}, {title: 'Google', value: 'google'}, {title: 'Facebook', value: 'facebook'}, {title: 'Justdial', value: 'justdial'}, {title: 'WhatsApp message', value: 'whatsapp'}]}, initialValue: 'direct', validation: (rule) => rule.required()}),
    defineField({name: 'date', title: 'Date of the review', type: 'date'}),
    imageField('photo', 'Customer photo (optional)'),
    orderField,
  ],
  orderings: [{title: 'Sort order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'trip', media: 'photo'}},
})

export const galleryItemType = defineType({
  name: 'galleryItem',
  title: 'Gallery photo',
  type: 'document',
  fields: [
    imageField('image', 'Photo', undefined, true),
    defineField({name: 'place', title: 'Where was this taken', description: 'For example: Batu Caves, Malaysia', type: 'string', validation: (rule) => rule.required()}),
    orderField,
  ],
  orderings: [{title: 'Sort order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'place', media: 'image'}},
})

export const faqType = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({name: 'question', title: 'Question', type: 'string', validation: (rule) => rule.required().max(160)}),
    defineField({name: 'answer', title: 'Answer', description: 'Only promise what the company really does.', type: 'text', rows: 5, validation: (rule) => rule.required()}),
    orderField,
  ],
  orderings: [{title: 'Sort order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'question', subtitle: 'answer'}},
})

export const offerType = defineType({
  name: 'offer',
  title: 'Offer',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Offer title', description: 'For example: Diwali group departure', type: 'string', validation: (rule) => rule.required().max(70)}),
    defineField({name: 'text', title: 'Details', type: 'text', rows: 3, validation: (rule) => rule.required().max(240)}),
    defineField({name: 'package', title: 'Linked package', type: 'reference', to: [{type: 'package'}]}),
    defineField({name: 'validTill', title: 'Valid till', description: 'The offer disappears from the website after this date.', type: 'date', validation: (rule) => rule.required()}),
    defineField({name: 'active', title: 'Show on the website', type: 'boolean', initialValue: true}),
    orderField,
  ],
  preview: {select: {title: 'title', subtitle: 'validTill'}},
})

const ro = {readOnly: true}

export const enquiryType = defineType({
  name: 'enquiry',
  title: 'Enquiry',
  type: 'document',
  description: 'Enquiries sent from the website form. Customer details cannot be edited; you can update the status and notes.',
  fields: [
    defineField({name: 'status', title: 'Status', type: 'string', options: {list: [{title: 'New', value: 'new'}, {title: 'Contacted', value: 'contacted'}, {title: 'Quote sent', value: 'quoted'}, {title: 'Booked', value: 'booked'}, {title: 'Closed', value: 'closed'}], layout: 'radio', direction: 'horizontal'}, initialValue: 'new'}),
    defineField({name: 'notes', title: 'Your notes', type: 'text', rows: 3}),
    defineField({name: 'name', title: 'Name', type: 'string', ...ro}),
    defineField({name: 'phone', title: 'Phone', type: 'string', ...ro}),
    defineField({name: 'trip', title: 'Trip', type: 'string', ...ro}),
    defineField({name: 'travellers', title: 'Travellers', type: 'string', ...ro}),
    defineField({name: 'month', title: 'Travel month', type: 'string', ...ro}),
    defineField({name: 'message', title: 'Message', type: 'text', rows: 4, ...ro}),
    defineField({name: 'page', title: 'Sent from page', type: 'string', ...ro}),
    defineField({name: 'receivedAt', title: 'Received', type: 'datetime', ...ro}),
  ],
  orderings: [{title: 'Newest first', name: 'newest', by: [{field: 'receivedAt', direction: 'desc'}]}],
  preview: {
    select: {name: 'name', phone: 'phone', trip: 'trip', status: 'status', at: 'receivedAt'},
    prepare: ({name, phone, trip, status, at}) => ({
      title: `${name ?? 'Unknown'} — ${phone ?? ''}`,
      subtitle: [(status ?? 'new').toUpperCase(), trip, at ? new Date(at).toLocaleString('en-IN') : null].filter(Boolean).join(' · '),
    }),
  },
})
