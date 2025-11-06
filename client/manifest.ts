import { lazy } from 'react'
import type { ModuleConfig } from 'shared'

export default {
  name: 'Venue Directories',
  icon: 'tabler:map',
  routes: {
    'venue-directories': lazy(() => import('@/pages/VenueList')),
    'venue-directories/:id': lazy(() => import('@/pages/Venue'))
  },
  category: 'Lifestyle',
  requiredAPIKeys: ['gcloud']
} satisfies ModuleConfig
