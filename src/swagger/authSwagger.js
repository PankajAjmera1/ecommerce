// export const authSwagger = {
  
//     '/auth/login': {
//       post: {
//         summary: 'Log in a user',
//         tags: ['Auth'],
//         requestBody: {
//           required: true,
//           content: {
//             'application/json': {
//               schema: {
//                 type: 'object',
//                 properties: {
//                   email: {
//                     type: 'string',
//                     description: 'User’s email',
//                   },
//                   password: {
//                     type: 'string',
//                     description: 'User’s password',
//                   },
//                 },
//               },
//             },
//           },
//         },
//         responses: {
//           200: {
//             description: 'Successfully logged in',
//           },
//           400: {
//             description: 'Invalid credentials',
//           },
//         },
//       },
//     },
//   };
  


export const authSwagger = {
  '/auth/signup': {
    post: {
      summary: 'Sign up a new user',
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'User’s name',
                  example: 'John Doe',
                },
                email: {
                  type: 'string',
                  description: 'User’s email',
                  example: 'john.doe@example.com',
                },
                password: {
                  type: 'string',
                  description: 'User’s password',
                  example: 'password123',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'User successfully signed up',
        },
        400: {
          description: 'Invalid request or user already exists',
        },
      },
    },
  },

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
                  example: 'john.doe@example.com',
                },
                password: {
                  type: 'string',
                  description: 'User’s password',
                  example: 'password123',
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

  '/auth/logout': {
    get: {
      summary: 'Log out a user',
      tags: ['Auth'],
      responses: {
        200: {
          description: 'Successfully logged out',
        },
      },
    },
  },

  '/auth/profile': {
    get: {
      summary: 'Get user profile',
      tags: ['Auth'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: 'Profile fetched successfully',
        },
        404: {
          description: 'User not found',
        },
      },
    },
  },

  '/auth/password/reset': {
    post: {
      summary: 'Request a password reset',
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
                  example: 'john.doe@example.com',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Reset password email sent',
        },
        400: {
          description: 'Invalid request',
        },
        404: {
          description: 'User not found',
        },
      },
    },
  },

  '/auth/password/reset/{token}': {
    post: {
      summary: 'Reset user password',
      tags: ['Auth'],
      parameters: [
        {
          name: 'token',
          in: 'path',
          required: true,
          description: 'Password reset token',
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                password: {
                  type: 'string',
                  description: 'New user password',
                  example: 'newpassword123',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Password reset successfully',
        },
        400: {
          description: 'Invalid or expired token',
        },
      },
    },
  },
};
