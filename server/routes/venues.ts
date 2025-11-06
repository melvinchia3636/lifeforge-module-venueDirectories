import getMedia from '@functions/external/media'
import { forgeController, forgeRouter } from '@functions/routes'
import { Location } from '@lib/locations/typescript/location.types'
import z from 'zod'

const list = forgeController
  .query()
  .description('List all venues')
  .input({})
  .callback(({ pb }) =>
    pb.getFullList.collection('venue_directories__venues').execute()
  )

const getById = forgeController
  .query()
  .description('Get a venue by ID')
  .input({
    query: z.object({
      id: z.string()
    })
  })
  .existenceCheck('query', {
    id: 'venue_directories__venues'
  })
  .callback(({ pb, query: { id } }) =>
    pb.getOne.collection('venue_directories__venues').id(id).execute()
  )

const validate = forgeController
  .query()
  .description('Validate whether a venue exists by ID')
  .input({
    query: z.object({
      id: z.string()
    })
  })
  .callback(
    async ({ pb, query: { id } }) =>
      !!(await pb.getOne
        .collection('venue_directories__venues')
        .id(id)
        .execute()
        .catch(() => null))
  )

const create = forgeController
  .mutation()
  .description('Create a new venue')
  .input({
    body: z.object({
      location: Location.optional().nullable()
    })
  })
  .media({
    icon: {
      optional: false,
      multiple: false
    }
  })
  .statusCode(201)
  .callback(async ({ pb, body: { location }, media: { icon } }) =>
    pb.create
      .collection('venue_directories__venues')
      .data({
        name: location?.name || 'Unnamed Venue',
        address: location?.formattedAddress || '',
        location_coords: {
          lat: location?.location.latitude || 0,
          lon: location?.location.longitude || 0
        },
        ...(await getMedia('icon', icon))
      })
      .execute()
  )

const update = forgeController
  .mutation()
  .description('Update a venue')
  .input({
    query: z.object({
      id: z.string()
    }),
    body: z.object({
      location: Location.optional().nullable()
    })
  })
  .media({
    icon: {
      optional: false,
      multiple: false
    }
  })
  .existenceCheck('query', {
    id: 'venue_directories__venues'
  })
  .callback(
    async ({ pb, query: { id }, body: { location }, media: { icon } }) =>
      pb.update
        .collection('venue_directories__venues')
        .id(id)
        .data({
          name: location?.name || 'Unnamed Venue',
          address: location?.formattedAddress || '',
          location_coords: {
            lat: location?.location.latitude || 0,
            lon: location?.location.longitude || 0
          },
          ...(await getMedia('icon', icon))
        })
        .execute()
  )

const remove = forgeController
  .mutation()
  .description('Delete a venue')
  .input({
    query: z.object({
      id: z.string()
    })
  })
  .existenceCheck('query', {
    id: 'venue_directories__venues'
  })
  .statusCode(204)
  .callback(({ pb, query: { id } }) =>
    pb.delete.collection('venue_directories__venues').id(id).execute()
  )

export default forgeRouter({
  list,
  getById,
  validate,
  create,
  update,
  remove
})
