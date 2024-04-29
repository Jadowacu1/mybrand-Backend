const listBlogs = {
  tags: ["Blog"],
  description: "Return a list of all blogs in the database",
  responses: {
    200: {
      description: "Successful operation",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              count: { type: "integer" },
              blogs: { type: "array", items: { type: "string" } },
            },
            example: {
              count: 0,
              blogs: [],
            },
          },
        },
      },
    },
  },
};

const getOneBlog = {
  tags: ["Blog"],
  description: "Return a blog with a given ID",
  responses: {
    200: {
      description: "Successful operation",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              count: { type: "integer" },
              blogs: { type: "array", items: { type: "string" } },
            },
            example: {
              count: 0,
              blogs: [],
            },
          },
        },
      },
    },
  },
};
const createBlog = {
  tags: ["Blog"],
  description: "Create a new blog post",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              minLength: 2,
              maxLength: 255,
            },
            content: {
              type: "string",
              minLength: 2,
              maxLength: 1024 * 10,
            },
            image: {
              type: "string",
              description: "URL of the thumbnail image for the blog post",
            },
          },
          required: ["title", "content", "image"],
        },
      },
    },
  },
  responses: {
    "201": {
      description: "Blog post created successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              _id: {
                type: "string",
                example: "1234567890abcdef",
              },
              title: {
                type: "string",
                example: "Blog Post Title",
              },
              content: {
                type: "string",
                example: "Blog Post Content",
              },
              image: {
                type: "string",
                example: "https://example.com/thumbnail.jpg",
              },
            },
          },
        },
      },
    },
  },
};

const updateBlog = {
  tags: ["Blog"],
  summary: "Update a blog post",
  parameters: [
    {
      name: "blogId",
      in: "path",
      description: "ID of the blog post to update",
      required: true,
      schema: {
        type: "string",
        example: "1234567890abcdef",
      },
    },
  ],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              minLength: 2,
              maxLength: 255,
            },
            content: {
              type: "string",
              minLength: 2,
              maxLength: 1024 * 10,
            },
            image: {
              type: "string",
              description: "URL of the thumbnail image for the blog post",
            },
          },
        },
      },
    },
  },

  responses: {
    "200": {
      description: "Blog post updated successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Blog post updated successfully",
              },
            },
          },
        },
      },
    },
    "404": {
      description: "Blog post not found",
    },
  },
};

const deleteBlog = {
  tags: ["Blog"],
  summary: "Delete a blog post",
  parameters: [
    {
      name: "blogId",
      in: "path",
      description: "ID of the blog post to delete",
      required: true,
      schema: {
        type: "string",
        example: "1234567890abcdef",
      },
    },
  ],
  security: [
    {
      BearerAuth: [],
    },
  ],
  responses: {
    "204": {
      description: "Blog post deleted successfully",
    },
    "404": {
      description: "Blog post not found",
    },
    "401": {
      description: "Unauthorized - Admin token is missing or invalid",
    },
  },
};

export const BlogDocs = {
  "/api/blogs/read": {
    get: {
      summary: "Get a list of all blogs",
      ...listBlogs,
    },
  },

  "/api/blog/create-blog": {
    get: {
      summary: "Create new blog",
      ...createBlog,
    },
  },

  "/api/blogs/read/662e3ddc10dec28a11af342c": {
    get: {
      summary: "Get a single blog post by ID",
      ...getOneBlog,
    },
  },

  "/api/blogs/edit/662e3ddc10dec28a11af342c": {
    get: {
      ...updateBlog,
    },
  },

  "/api/blogs/delete/": {
    get: {
      ...deleteBlog,
    },
  },
};
