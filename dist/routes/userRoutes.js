"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authControllers_1 = require("../controllers/authControllers");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user with email, password, and name.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: Password for the account.
 *                 example: password123
 *               name:
 *                 type: string
 *                 description: Name of the user.
 *                 example: John Doe
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request - Validation errors
 */
router.post('/register', validation_1.validateRegister, authControllers_1.register);
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Log in an existing user
 *     description: Logs in a user with email and password.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: User's password.
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful, returns a JWT token
 *       400:
 *         description: Bad request - Validation errors
 *       401:
 *         description: Unauthorized - Invalid credentials
 */
router.post('/login', validation_1.validateLogin, authControllers_1.login);
exports.default = router;
