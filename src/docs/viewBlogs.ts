// const listBlogs = {
//   tags: ["Blog"],
//   description: "Return a list of all blogs in the database",
//   responses: {
//     200: {
//       description: "Successful operation",
//       content: {
//         "application/json": {
//           schema: {
//             type: "object",
//             properties: {
//               count: { type: "integer" },
//               blogs: { type: "array", items: { type: "string" } },
//             },
//             example: {
//               count: 0,
//               blogs: [],
//             },
//           },
//         },
//       },
//     },
//   },
// };
// export const BlogDocs = {
//   "/api/blogs/read": {
//     get: {
//       summary: "Get a list of all blogs",
//       ...listBlogs,
//     },
//   },
// };
