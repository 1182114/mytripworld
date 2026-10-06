import {BookIcon} from '@sanity/icons/Book'
import {CogIcon} from '@sanity/icons/Cog'
import {CommentIcon} from '@sanity/icons/Comment'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {EarthGlobeIcon} from '@sanity/icons/EarthGlobe'
import {EnvelopeIcon} from '@sanity/icons/Envelope'
import {HelpCircleIcon} from '@sanity/icons/HelpCircle'
import {HomeIcon} from '@sanity/icons/Home'
import {ImagesIcon} from '@sanity/icons/Images'
import {PinIcon} from '@sanity/icons/Pin'
import {RocketIcon} from '@sanity/icons/Rocket'
import {TagIcon} from '@sanity/icons/Tag'
import type {StructureResolver} from 'sanity/structure'
import {fixedPageKeys, legalPageIds, singletonIds} from './schemas'

const pageTitles: Record<(typeof fixedPageKeys)[number], string> = {
  about: 'About us',
  tourPackages: 'Tour packages (list page)',
  cruise: 'Cruise holidays',
  gallery: 'Gallery page',
  contact: 'Contact',
  india: 'India tours',
  departureCities: 'Departure cities (list page)',
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('My Trip World')
    .items([
      S.listItem()
        .title('Enquiries')
        .icon(EnvelopeIcon)
        .child(
          S.list()
            .title('Enquiries')
            .items([
              S.listItem()
                .title('New')
                .icon(EnvelopeIcon)
                .child(S.documentList().title('New enquiries').apiVersion('2025-02-19').filter('_type == "enquiry" && (status == "new" || !defined(status))').defaultOrdering([{field: 'receivedAt', direction: 'desc'}])),
              S.listItem()
                .title('In progress')
                .child(S.documentList().title('In progress').apiVersion('2025-02-19').filter('_type == "enquiry" && status in ["contacted", "quoted"]').defaultOrdering([{field: 'receivedAt', direction: 'desc'}])),
              S.listItem()
                .title('Booked')
                .child(S.documentList().title('Booked').apiVersion('2025-02-19').filter('_type == "enquiry" && status == "booked"').defaultOrdering([{field: 'receivedAt', direction: 'desc'}])),
              S.listItem()
                .title('All enquiries')
                .child(S.documentTypeList('enquiry').title('All enquiries').defaultOrdering([{field: 'receivedAt', direction: 'desc'}])),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Packages')
        .icon(RocketIcon)
        .child(
          S.list()
            .title('Packages')
            .items([
              S.listItem().title('All packages').icon(RocketIcon).child(S.documentTypeList('package').title('All packages').defaultOrdering([{field: 'order', direction: 'asc'}])),
              S.listItem().title('International tours').child(S.documentList().title('International tours').apiVersion('2025-02-19').filter('_type == "package" && kind == "tour"').defaultOrdering([{field: 'order', direction: 'asc'}])),
              S.listItem().title('Cruise holidays').child(S.documentList().title('Cruise holidays').apiVersion('2025-02-19').filter('_type == "package" && kind == "cruise"').defaultOrdering([{field: 'order', direction: 'asc'}])),
              S.listItem().title('India tours').child(S.documentList().title('India tours').apiVersion('2025-02-19').filter('_type == "package" && kind == "inbound"').defaultOrdering([{field: 'order', direction: 'asc'}])),
            ]),
        ),
      S.listItem().title('Offers').icon(TagIcon).child(S.documentTypeList('offer').title('Offers')),
      S.listItem().title('Destinations').icon(EarthGlobeIcon).child(S.documentTypeList('destination').title('Destinations').defaultOrdering([{field: 'order', direction: 'asc'}])),
      S.listItem().title('Departure cities').icon(PinIcon).child(S.documentTypeList('city').title('Departure cities').defaultOrdering([{field: 'order', direction: 'asc'}])),
      S.divider(),
      S.listItem().title('Customer reviews').icon(CommentIcon).child(S.documentTypeList('testimonial').title('Customer reviews').defaultOrdering([{field: 'order', direction: 'asc'}])),
      S.listItem().title('Gallery').icon(ImagesIcon).child(S.documentTypeList('galleryItem').title('Gallery photos').defaultOrdering([{field: 'order', direction: 'asc'}])),
      S.listItem().title('FAQs').icon(HelpCircleIcon).child(S.documentTypeList('faq').title('FAQs').defaultOrdering([{field: 'order', direction: 'asc'}])),
      S.divider(),
      S.listItem()
        .title('Pages')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem().title('Home page').icon(HomeIcon).child(S.document().schemaType('homePage').documentId(singletonIds.homePage).title('Home page')),
              ...fixedPageKeys.map((key) =>
                S.listItem()
                  .title(pageTitles[key])
                  .icon(DocumentTextIcon)
                  .child(S.document().schemaType('pageContent').documentId(`page-${key}`).title(pageTitles[key])),
              ),
              S.divider(),
              S.listItem().title('Privacy Policy').icon(BookIcon).child(S.document().schemaType('legalPage').documentId(legalPageIds[0]).title('Privacy Policy')),
              S.listItem().title('Terms & Conditions').icon(BookIcon).child(S.document().schemaType('legalPage').documentId(legalPageIds[1]).title('Terms & Conditions')),
            ]),
        ),
      S.listItem().title('Site settings').icon(CogIcon).child(S.document().schemaType('siteSettings').documentId(singletonIds.siteSettings).title('Site settings')),
    ])
