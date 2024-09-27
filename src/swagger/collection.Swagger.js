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
              required: ['name'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Collection created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'Collection created successfully' },
                  collection: {
                    type: 'object',
                    properties: {
                      _id: { type: 'string', example: '64e3fcf8f1f74c001bc8a0b5' },
                      name: { type: 'string', example: 'New Collection' },
                      description: { type: 'string', example: 'This is a description for a new collection' },
                    },
                  },
                },
              },
            },
          },
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
  '/collection/updateCollection/{id}': {
    put: {
      summary: 'Update an existing collection',
      tags: ['Collection'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' },
          description: 'The ID of the collection to update',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string', description: 'New name for the collection', example: 'Updated Collection' },
              },
              required: ['name'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Collection updated successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'Collection updated successfully' },
                  updatedCollection: {
                    type: 'object',
                    properties: {
                      _id: { type: 'string', example: '64e3fcf8f1f74c001bc8a0b5' },
                      name: { type: 'string', example: 'Updated Collection' },
                    },
                  },
                },
              },
            },
          },
        },
        404: {
          description: 'Collection not found',
        },
      },
    },
  },
  '/collection/{id}': {
    delete: {
      summary: 'Delete a collection',
      tags: ['Collection'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'string' },
          description: 'The ID of the collection to delete',
        },
      ],
      responses: {
        200: {
          description: 'Collection deleted successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean', example: true },
                  message: { type: 'string', example: 'Collection deleted successfully' },
                },
              },
            },
          },
        },
        404: {
          description: 'Collection not found',
        },
      },
    },
  },
};
