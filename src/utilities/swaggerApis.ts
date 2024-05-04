/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: apiKey
 *       name: authorization
 *       in: header
 */

// -------------------------USER---------------------------------

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User routes
 */

/**
 * @swagger
 * /users/registration:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirm:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *               - confirm
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad Request
 *       409:
 *         description: User already exists
 */

/**
 * @swagger
 * /users/userVerification:
 *   post:
 *     summary: Verify User Email
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *             required:
 *               - email
 *               - otp
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: No User or Invalid Token
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid email or password
 */

/**
 * @swagger
 * /users/viewUsers:
 *   get:
 *     summary: View All users (ADMIN)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 */

/**
 * @swagger
 * /users/deleteUser/{userId}:
 *   delete:
 *     summary: Delete user (ADMIN)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the users
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted  successfully
 *       400:
 *         description: Failed to delete user
 */

// -------------------------BLOGS--------------------------------------

/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: Blog routes
 */

/**
 * @swagger
 * /blogs/create:
 *   post:
 *     summary: Creating a blog (Admin)
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *             required:
 *               - title
 *               - content
 *               - imageUrl
 *     responses:
 *       201:
 *         description: Blog Created successfully
 *       400:
 *         description: Bad Request
 */

/**
 * @swagger
 * /blogs/edit/{blogId}:
 *   put:
 *     summary: Update a blog (by ADMIN only)
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *             required:
 *               - title
 *               - content
 *               - image
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       400:
 *         description: Bad Request
 */

/**
 * @swagger
 * /blogs/read:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all blogs
 */

/**
 * @swagger
 * /blogs/read/{blogId}:
 *   get:
 *     summary: Get a blog by ID
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog retrieved successfully
 */

/**
 * @swagger
 * /blogs/delete/{blogId}:
 *   delete:
 *     summary: Delete a blog
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 */

// -------------------------Messages---------------------------------

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Messages routes
 */

/**
 * @swagger
 * /messages/recordingMessage:
 *   post:
 *     summary: Sending   message to Admin
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               message:
 *                 type: string
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - phoneNumber
 *               - message
 *     responses:
 *       201:
 *         description: message is sent successfully
 *       400:
 *         description: Bad Request
 */

/**
 * @swagger
 * /messages/viewMessages:
 *   get:
 *     summary: Getting all messages (ADMIN only)
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all suggestions
 *       400:
 *         description: Not logged in as Admin
 */

/**
 * @swagger
 * /messages/deletingMessage/{messageId}:
 *   delete:
 *     summary: Delete a message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         description: ID of the message
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message deleted successfully
 */

//---------------------END----------------
