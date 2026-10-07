import {defineArrayMember, defineField, defineType} from 'sanity'
import {imageField} from './shared'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    {name: 'company', title: 'Company', default: true},
    {name: 'contact', title: 'Phone & email'},
    {name: 'offices', title: 'Offices'},
    {name: 'social', title: 'Social links'},
    {name: 'usps', title: 'Special benefits (USPs)'},
    {name: 'seo', title: 'Google'},
  ],
  fields: [
    defineField({name: 'companyName', title: 'Company name', type: 'string', group: 'company', validation: (rule) => rule.required()}),
    defineField({name: 'tagline', title: 'Tagline', type: 'string', group: 'company'}),
    defineField({name: 'parentCompany', title: 'Parent company line', description: 'For example: A division of S.C.R Infotech Pvt. Ltd.', type: 'string', group: 'company'}),
    defineField({name: 'legalName', title: 'Registered company name', type: 'string', group: 'company'}),
    defineField({name: 'foundedYear', title: 'Year the company started', type: 'number', group: 'company', validation: (rule) => rule.min(1950).max(2100).integer()}),
    {...imageField('logo', 'Logo', 'A wide PNG with a transparent background works best.', true), group: 'company'},
    defineField({name: 'footerText', title: 'Short line in the footer', type: 'text', rows: 2, group: 'company', validation: (rule) => rule.max(220)}),

    defineField({
      name: 'phone',
      title: 'Main phone number',
      description: 'With country code, for example +91 97280-24440',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.required().regex(/^\+\d[\d\s-]{8,}$/, {name: 'phone number', invert: false}).error('Start with + and the country code, e.g. +91 97280-24440'),
    }),
    defineField({name: 'phoneNote', title: 'Other numbers (small text)', description: 'For example: Also on 97280-24441 to 24448', type: 'string', group: 'contact'}),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp number',
      description: 'Digits only with country code and no +, for example 919728024440',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.required().regex(/^\d{10,15}$/, {name: 'digits only'}).error('Digits only, with country code. Example: 919728024440'),
    }),
    defineField({name: 'email', title: 'Main email', type: 'string', group: 'contact', validation: (rule) => rule.required().email()}),
    defineField({name: 'complaintsEmail', title: 'Complaints email', type: 'string', group: 'contact', validation: (rule) => rule.email()}),
    defineField({name: 'workingHours', title: 'Working hours', description: 'For example: Monday to Saturday, 9:00 AM – 5:00 PM', type: 'string', group: 'contact'}),

    defineField({
      name: 'offices',
      title: 'Offices',
      type: 'array',
      group: 'offices',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'office',
          fields: [
            defineField({name: 'city', title: 'City', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'street', title: 'Address (building, road, landmark)', type: 'text', rows: 2, validation: (rule) => rule.required()}),
            defineField({name: 'region', title: 'State', type: 'string', initialValue: 'Haryana'}),
            defineField({name: 'postalCode', title: 'PIN code', type: 'string', validation: (rule) => rule.regex(/^\d{6}$/, {name: '6-digit PIN'})}),
            defineField({name: 'mapUrl', title: 'Google Maps link', type: 'url'}),
          ],
          preview: {select: {title: 'city', subtitle: 'street'}},
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),

    defineField({
      name: 'social',
      title: 'Social links',
      type: 'object',
      group: 'social',
      fields: ['facebook', 'instagram', 'youtube', 'googleBusiness', 'justdial', 'tripadvisor'].map((n) =>
        defineField({name: n, title: n === 'googleBusiness' ? 'Google Business Profile' : n.charAt(0).toUpperCase() + n.slice(1), type: 'url'}),
      ),
    }),
    defineField({
      name: 'justdialRating',
      title: 'Justdial rating shown on the website',
      description: 'Copy the real numbers from your Justdial listing. Leave empty to hide the badge.',
      type: 'object',
      group: 'social',
      fields: [
        defineField({name: 'score', title: 'Rating', type: 'number', validation: (rule) => rule.min(1).max(5)}),
        defineField({name: 'count', title: 'Number of ratings', type: 'number', validation: (rule) => rule.min(1).integer()}),
      ],
    }),

    defineField({name: 'uspLabel', title: 'Heading on the benefits strip', type: 'string', group: 'usps', initialValue: 'Included with every package'}),
    defineField({
      name: 'usps',
      title: 'Special benefits',
      description: 'The things you offer that other agencies do not. Keep to two.',
      type: 'array',
      group: 'usps',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'usp',
          fields: [
            defineField({name: 'icon', title: 'Icon', type: 'string', options: {list: [{title: 'Car', value: 'car'}, {title: 'Home', value: 'home'}, {title: 'Plane', value: 'plane'}, {title: 'Shield', value: 'shield'}]}, initialValue: 'car'}),
            defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required().max(40)}),
            defineField({name: 'text', title: 'One-line explanation', type: 'string', validation: (rule) => rule.required().max(120)}),
          ],
          preview: {select: {title: 'title', subtitle: 'text'}},
        }),
      ],
      validation: (rule) => rule.max(2),
    }),
    defineField({name: 'uspChip', title: 'Short benefit label on package photos', type: 'string', group: 'usps', validation: (rule) => rule.max(28)}),

    defineField({name: 'seoTitle', title: 'Home page search title', type: 'string', group: 'seo', validation: (rule) => rule.required().max(60)}),
    defineField({name: 'seoDescription', title: 'Home page search description', type: 'text', rows: 3, group: 'seo', validation: (rule) => rule.required().max(160)}),
    defineField({name: 'longDescription', title: 'Company description (for Google and AI assistants)', type: 'text', rows: 4, group: 'seo', validation: (rule) => rule.required().max(320)}),
    {...imageField('shareImage', 'Photo shown when the site is shared on WhatsApp / Facebook'), group: 'seo'},
    defineField({
      name: 'areaServed',
      title: 'Cities and regions you serve',
      type: 'array',
      group: 'seo',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
})
