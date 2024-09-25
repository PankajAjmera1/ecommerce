export const productSwagger = {
    '/product/add': {
      post: {
        summary: 'Add a new product',
        tags: ['Product'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'Name of the product',
                    example: 'Smartphone',
                  },
                  price: {
                    type: 'number',
                    description: 'Price of the product',
                    example: 599,
                  },
                  description: {
                    type: 'string',
                    description: 'Product description',
                    example: 'A high-end smartphone with 128GB storage',
                  },
                  collectionId: {
                    type: 'string',
                    description: 'ID of the collection the product belongs to',
                    example: '64e3fcf8f1f74c001bc8a0b5',
                  },
                  // For file uploads (images)
                  'images': {
                    type: 'array',
                    items: {
                      type: 'string',
                      format: 'binary',
                    },
                    description: 'Product images',
                  },
                },
                required: ['name', 'price', 'description', 'collectionId', 'images'],
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Product created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Product created successfully' },
                    product: {
                      type: 'object',
                      properties: {
                        _id: { type: 'string', example: '64e3fcf8f1f74c001bc8a0b5' },
                        name: { type: 'string', example: 'Smartphone' },
                        price: { type: 'number', example: 599 },
                        description: { type: 'string', example: 'A high-end smartphone with 128GB storage' },
                        photos: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              secure_url: { type: 'string', example: 'https://s3.amazonaws.com/bucket/products/photo_1.png' },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: false },
                    message: { type: 'string', example: 'All fields are required' },
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  