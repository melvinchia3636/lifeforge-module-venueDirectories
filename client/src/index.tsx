import { useQuery } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import {
  Button,
  ModuleHeader,
  SearchInput,
  WithQuery,
  useModalStore
} from 'lifeforge-ui'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { InferOutput } from 'shared'

import ModifyVenueModal from './components/ModifyVenueModal'
import VenueItem from './components/VenueItem'
import forgeAPI from './utils/forgeAPI'

export type Venue = InferOutput<typeof forgeAPI.venueDirectories.venues.list>[0]

function VenueDirectories() {
  const open = useModalStore(state => state.open)

  const { t } = useTranslation('apps.venueDirectories')

  const venuesQuery = useQuery(
    forgeAPI.venueDirectories.venues.list.queryOptions()
  )

  const [searchQuery, setSearchQuery] = useState('')

  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  return (
    <>
      <ModuleHeader
        actionButton={
          <Button
            icon="tabler:plus"
            tProps={{
              item: t('items.venue')
            }}
            onClick={() =>
              open(ModifyVenueModal, {
                openType: 'create'
              })
            }
          >
            new
          </Button>
        }
        totalItems={venuesQuery.data?.length}
      />
      <SearchInput
        className="mb-4"
        namespace="apps.venueDirectories"
        searchTarget="venue"
        setValue={setSearchQuery}
        value={searchQuery}
      />
      <WithQuery query={venuesQuery}>
        {venues => (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {venues.map(venue => (
              <VenueItem key={venue.id} venue={venue} />
            ))}
          </div>
        )}
      </WithQuery>
    </>
  )
}

export default VenueDirectories
