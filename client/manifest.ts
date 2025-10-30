import { lazy } from 'react'
import type { ModuleConfig } from 'shared'

export default {
  name: 'Venue Directories',
  icon: 'tabler:map',
  routes: {
    'venue-directories': lazy(() => import('@'))
  },
  category: 'Lifestyle'
} satisfies ModuleConfig
