export const collectionSwagger = {
    '/collection/create': {
      post: {
        summary: 'Create a new collection',
        tags: ['Collection'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'Collection name',
                    example: 'New Collection',
                  },
                  description: {
                    type: 'string',
                    description: 'Collection description',
                    example: 'This is a description for a new collection',
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Collection created successfully',
          },
          400: {
            description: 'Invalid request body',
          },
        },
      },
    },
    '/collection/getCollection': {
      get: {
        summary: 'Get all collections',
        tags: ['Collection'],
        responses: {
          200: {
            description: 'A list of collections',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      _id: { type: 'string', example: '64e3fcf8f1f74c001bc8a0b5' },
                      name: { type: 'string', example: 'Electronics' },
                      description: { type: 'string', example: 'A collection of electronic gadgets' },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: 'No collections found',
          },
        },
      },
    },
  };
  