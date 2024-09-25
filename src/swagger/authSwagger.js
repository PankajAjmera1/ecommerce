export const authSwagger = {
  
    '/auth/login': {
      post: {
        summary: 'Log in a user',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    description: 'User’s email',
                  },
                  password: {
                    type: 'string',
                    description: 'User’s password',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Successfully logged in',
          },
          400: {
            description: 'Invalid credentials',
          },
        },
      },
    },
  };
  