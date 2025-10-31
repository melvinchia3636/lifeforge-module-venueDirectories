import type { Venue } from '@'
import forgeAPI from '@/utils/forgeAPI'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormModal, defineForm } from 'lifeforge-ui'
import { toast } from 'react-toastify'
import type { InferInput } from 'shared'

function ModifyVenueModal({
  onClose,
  data: { openType, initialData }
}: {
  onClose: () => void
  data: {
    openType: 'create' | 'update'
    initialData?: Venue
  }
}) {
  const queryClient = useQueryClient()

  const mutation = useMutation(
    (openType === 'create'
      ? forgeAPI.venueDirectories.venues.create
      : forgeAPI.venueDirectories.venues.update.input({
          id: initialData?.id || ''
        })
    ).mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['venueDirectories', 'venues']
        })
      },
      onError: error => {
        toast.error(
          `Failed to ${openType === 'create' ? 'create' : 'update'} venue: ${error.message}`
        )
      }
    })
  )

  const { formProps } = defineForm<
    InferInput<typeof forgeAPI.venueDirectories.venues.create>['body']
  >({
    title: `venue.${openType}`,
    icon: openType === 'create' ? 'tabler:plus' : 'tabler:pencil',
    onClose,
    submitButton: openType,
    namespace: 'apps.venueDirectories'
  })
    .typesMap({
      location: 'location',
      icon: 'file'
    })
    .setupFields({
      location: {
        label: 'venue location',
        required: true
      },
      icon: {
        optional: false,
        icon: 'tabler:icons',
        label: 'venue icon',
        acceptedMimeTypes: {
          image: ['png', 'jpeg', 'jpg', 'webp', 'svg+xml']
        },
        required: true
      }
    })
    .autoFocusField('location')
    .initialData({
      location: {
        name: initialData?.name || '',
        formattedAddress: initialData?.address || '',
        location: {
          latitude: initialData?.location_coords.lat || 0,
          longitude: initialData?.location_coords.lon || 0
        }
      },
      icon: {
        file:
          typeof initialData?.icon === 'string' && initialData?.icon.length > 0
            ? 'keep'
            : (initialData?.icon as File | undefined) instanceof File
              ? (initialData!.icon as unknown as File)
              : null,
        preview: initialData?.icon
          ? typeof initialData?.icon === 'string'
            ? forgeAPI.media.input({
                collectionId: initialData.collectionId!,
                recordId: initialData.id!,
                fieldId: initialData!.icon
              }).endpoint
            : (initialData?.icon as File | undefined) instanceof File
              ? URL.createObjectURL(initialData!.icon as unknown as File)
              : null
          : null
      }
    })
    .onSubmit(async values => {
      console.log(values)
      await mutation.mutateAsync(values)
    })
    .build()

  return <FormModal {...formProps} />
}

export default ModifyVenueModal
