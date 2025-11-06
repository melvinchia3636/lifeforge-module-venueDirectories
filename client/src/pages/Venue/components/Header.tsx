import forgeAPI from '@/utils/forgeAPI'
import { Icon } from '@iconify/react'
import { Button, useModalStore } from 'lifeforge-ui'

import type { Venue } from '../../VenueList'
import ModifyVenueModal from '../../VenueList/components/ModifyVenueModal'

function Header({ metadata }: { metadata: Venue }) {
  const open = useModalStore(state => state.open)

  return (
    <header className="mb-6 flex items-center gap-4">
      <div className="size-14 shrink-0 rounded-lg">
        <img
          alt=""
          className="shadow-custom h-full w-full rounded-lg object-contain"
          src={
            forgeAPI.media.input({
              collectionId: metadata.collectionId,
              recordId: metadata.id,
              fieldId: metadata.icon
            }).endpoint
          }
        />
      </div>
      <div className="w-full min-w-0">
        <div className="flex items-center gap-2">
          <h1 className="min-w-0 truncate text-2xl font-medium">
            {metadata.name}
          </h1>
          <Button
            icon="tabler:pencil"
            variant="plain"
            onClick={() =>
              open(ModifyVenueModal, {
                initialData: metadata,
                openType: 'update'
              })
            }
          />
        </div>
        <div className="mt-1 flex w-full min-w-0 items-center gap-2">
          <Icon
            className="text-bg-500 inline-block size-4"
            icon="tabler:map-pin"
          />
          <p className="text-bg-500 w-full min-w-0 truncate">
            {metadata.address}
          </p>
        </div>
      </div>
    </header>
  )
}

export default Header
