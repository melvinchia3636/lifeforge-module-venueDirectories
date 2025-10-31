import { forgeRouter } from '@functions/routes'

import venueRoutes from './routes/venues'

export default forgeRouter({
  venues: venueRoutes
})
