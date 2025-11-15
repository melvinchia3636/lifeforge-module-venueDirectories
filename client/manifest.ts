import { lazy } from 'react'
import type { ModuleConfig } from 'shared'

export default {
  name: 'Venue Directories',
  icon: 'tabler:map',
  routes: {
    '/': lazy(() => import('@/pages/VenueList')),
    '/:id': lazy(() => import('@/pages/Venue'))
  },
  category: 'Lifestyle',
  requiredAPIKeys: ['gcloud']
} satisfies ModuleConfig
