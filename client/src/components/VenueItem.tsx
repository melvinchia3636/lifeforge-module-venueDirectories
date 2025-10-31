import type { Venue } from '@'
import forgeAPI from '@/utils/forgeAPI'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  ConfirmationModal,
  ContextMenu,
  ContextMenuItem,
  ItemWrapper,
  useModalStore
} from 'lifeforge-ui'
import { toast } from 'react-toastify'

import ModifyVenueModal from './ModifyVenueModal'

function VenueItem({ venue }: { venue: Venue }) {
  const queryClient = useQueryClient()

  const open = useModalStore(state => state.open)

  const deleteMutation = useMutation(
    forgeAPI.venueDirectories.venues.remove
      .input({ id: venue.id })
      .mutationOptions({
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['venueDirectories', 'venues']
          })
        },
        onError: error => {
          toast.error(`Failed to delete venue: ${error.message}`)
        }
      })
  )

  const handleUpdateContainer = () => {
    open(ModifyVenueModal, {
      openType: 'update',
      initialData: venue
    })
  }

  const handleDeleteContainer = () => {
    open(ConfirmationModal, {
      title: 'Delete Venue',
      description: `Are you sure you want to delete the venue "${venue.name}"? This action cannot be undone.`,
      confirmButton: 'Delete',
      onConfirm: async () => {
        deleteMutation.mutateAsync({})
      }
    })
  }

  return (
    <ItemWrapper key={venue.id} className="group">
      <img
        alt={venue.name}
        className="component-bg-lighter mb-4 aspect-square w-full rounded-md object-contain p-4"
        src={
          forgeAPI.media.input({
            collectionId: venue.collectionId,
            recordId: venue.id,
            fieldId: venue.icon,
            thumb: '256x0'
          }).endpoint
        }
      />
      <h3 className="mb-2 truncate text-lg font-medium">{venue.name}</h3>
      <p className="text-bg-500 text-sm">{venue.address}</p>
      <ContextMenu
        classNames={{
          wrapper:
            'absolute z-[100] right-2 top-2 group-focus:opacity-100 group-hover:opacity-100 data-[state=open]:opacity-100 opacity-0 transition-opacity',
          button:
            'bg-bg-100 hover:bg-bg-200 text-bg-500 dark:bg-bg-800 dark:hover:bg-bg-700! dark:text-bg-600'
        }}
      >
        <ContextMenuItem
          icon="tabler:pencil"
          label="Edit"
          onClick={handleUpdateContainer}
        />
        <ContextMenuItem
          dangerous
          icon="tabler:trash"
          label="Delete"
          onClick={handleDeleteContainer}
        />
      </ContextMenu>
    </ItemWrapper>
  )
}

export default VenueItem
