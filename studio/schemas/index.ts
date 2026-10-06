import {cityType, destinationType, enquiryType, faqType, galleryItemType, offerType, testimonialType} from './collections'
import {packageType} from './package'
import {homePageType, legalPageType, pageContentType} from './pages'
import {siteSettingsType} from './siteSettings'

export const schemaTypes = [
  packageType,
  destinationType,
  cityType,
  testimonialType,
  galleryItemType,
  offerType,
  faqType,
  homePageType,
  pageContentType,
  legalPageType,
  siteSettingsType,
  enquiryType,
]

/** One-of-a-kind documents: opened directly, never created or deleted from lists. */
export const singletonIds = {siteSettings: 'siteSettings', homePage: 'homePage'} as const
export const fixedPageKeys = ['about', 'tourPackages', 'cruise', 'gallery', 'contact', 'india', 'departureCities'] as const
export const legalPageIds = ['legal-privacy-policy', 'legal-terms'] as const
