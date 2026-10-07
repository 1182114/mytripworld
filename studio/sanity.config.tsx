import {visionTool} from '@sanity/vision'
import {buildLegacyTheme, defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemas'
import {structure} from './structure'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const siteUrl = (process.env.SANITY_STUDIO_SITE_URL || 'https://mytripworld.net').replace(/\/$/, '')

if (!projectId) {
  throw new Error('SANITY_STUDIO_PROJECT_ID is missing. Copy studio/.env.example to studio/.env and add the project ID.')
}

// Brand colours taken from the My Trip World logo.
const navy = '#2e3d6e'
const yellow = '#fdb913'
const theme = buildLegacyTheme({
  '--black': '#1c2752',
  '--white': '#ffffff',
  '--gray': '#5b6380',
  '--gray-base': '#5b6380',
  '--component-bg': '#ffffff',
  '--component-text-color': '#1c2752',
  '--brand-primary': navy,
  '--default-button-color': '#5b6380',
  '--default-button-primary-color': navy,
  '--default-button-success-color': '#1a8f5c',
  '--default-button-warning-color': yellow,
  '--default-button-danger-color': '#c8382f',
  '--state-info-color': navy,
  '--state-success-color': '#1a8f5c',
  '--state-warning-color': yellow,
  '--state-danger-color': '#c8382f',
  '--main-navigation-color': '#1c2752',
  '--main-navigation-color--inverted': '#ffffff',
  '--focus-color': yellow,
})

const Logo = () => <img src="/static/icon.png" alt="My Trip World" style={{height: '100%', width: '100%', objectFit: 'contain', borderRadius: 6}} />

// Documents that exist exactly once, or are created only by the website.
const fixedTypes = new Set(['siteSettings', 'homePage', 'pageContent', 'legalPage', 'enquiry'])

/** The live page an editor is working on, for the "Open preview" link. */
function pageUrl(doc: {_type: string; slug?: {current?: string}; key?: string}): string | undefined {
  const slug = doc.slug?.current
  switch (doc._type) {
    case 'package':
      return slug ? `${siteUrl}/tour-packages/${slug}/` : undefined
    case 'city':
      return slug ? `${siteUrl}/${slug}/` : undefined
    case 'destination':
      return slug ? `${siteUrl}/destinations/${slug}/` : undefined
    case 'legalPage':
      return slug ? `${siteUrl}/${slug}/` : undefined
    case 'homePage':
    case 'siteSettings':
    case 'testimonial':
      return `${siteUrl}/reviews/`
    case 'faq':
    case 'offer':
      return `${siteUrl}/`
    case 'galleryItem':
      return `${siteUrl}/gallery/`
    case 'pageContent':
      return {
        about: `${siteUrl}/about-us/`,
        tourPackages: `${siteUrl}/tour-packages/`,
        cruise: `${siteUrl}/cruise-holidays/`,
        gallery: `${siteUrl}/gallery/`,
        contact: `${siteUrl}/contact/`,
        india: `${siteUrl}/india-tour-packages/`,
        departureCities: `${siteUrl}/departure-cities/`,
      }[doc.key ?? '']
    default:
      return undefined
  }
}

export default defineConfig({
  name: 'default',
  title: 'My Trip World Admin',
  icon: Logo,
  projectId,
  dataset,
  theme,
  plugins: [structureTool({structure, title: 'Content'}), visionTool({title: 'Query (advanced)'})],
  schema: {
    types: schemaTypes,
    // Hide one-off documents from the global "Create new" menu.
    templates: (templates) => templates.filter((t) => !fixedTypes.has(t.schemaType)),
  },
  document: {
    productionUrl: async (prev, {document}) => pageUrl(document as Parameters<typeof pageUrl>[0]) ?? prev,
    actions: (actions, {schemaType}) =>
      fixedTypes.has(schemaType) && schemaType !== 'enquiry'
        ? actions.filter((a) => a.action !== 'duplicate' && a.action !== 'delete' && a.action !== 'unpublish')
        : schemaType === 'enquiry'
          ? actions.filter((a) => a.action !== 'duplicate')
          : actions,
    newDocumentOptions: (items) => items.filter((item) => !fixedTypes.has(item.templateId)),
  },
})
