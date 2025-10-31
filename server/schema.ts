import z from 'zod'

const venueDirectoriesSchemas = {
  venues: {
    schema: z.object({
      name: z.string(),
      address: z.string(),
      location_coords: z.object({ lat: z.number(), lon: z.number() }),
      icon: z.string()
    }),
    raw: {
      id: 'pbc_808264937',
      listRule: '@request.auth.id != ""',
      viewRule: '@request.auth.id != ""',
      createRule: '@request.auth.id != ""',
      updateRule: '@request.auth.id != ""',
      deleteRule: '@request.auth.id != ""',
      name: 'venue_directories__venues',
      type: 'base',
      fields: [
        {
          autogeneratePattern: '[a-z0-9]{15}',
          hidden: false,
          id: 'text3208210256',
          max: 15,
          min: 15,
          name: 'id',
          pattern: '^[a-z0-9]+$',
          presentable: false,
          primaryKey: true,
          required: true,
          system: true,
          type: 'text'
        },
        {
          autogeneratePattern: '',
          hidden: false,
          id: 'text1579384326',
          max: 0,
          min: 0,
          name: 'name',
          pattern: '',
          presentable: false,
          primaryKey: false,
          required: false,
          system: false,
          type: 'text'
        },
        {
          autogeneratePattern: '',
          hidden: false,
          id: 'text223244161',
          max: 0,
          min: 0,
          name: 'address',
          pattern: '',
          presentable: false,
          primaryKey: false,
          required: false,
          system: false,
          type: 'text'
        },
        {
          hidden: false,
          id: 'geoPoint2468307335',
          name: 'location_coords',
          presentable: false,
          required: false,
          system: false,
          type: 'geoPoint'
        },
        {
          hidden: false,
          id: 'file1704208859',
          maxSelect: 1,
          maxSize: 0,
          mimeTypes: [
            'image/jpeg',
            'image/png',
            'image/svg+xml',
            'image/gif',
            'image/webp'
          ],
          name: 'icon',
          presentable: false,
          protected: false,
          required: false,
          system: false,
          thumbs: ['96x0'],
          type: 'file'
        }
      ],
      indexes: [],
      system: false
    }
  }
}

export default venueDirectoriesSchemas
