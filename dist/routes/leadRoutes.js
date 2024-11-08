"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leadController_1 = require("../controllers/leadController");
const auth_1 = require("../middleware/auth");
const leadController_2 = require("../controllers/leadController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/send-payment-link:
 *   post:
 *     summary: Send payment link to the franchisee
 *     description: Sends a payment link to the franchisee to complete the payment for the franchise fee.
 *     tags:
 *       - Leads
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the franchisee.
 *               franchiseDetails:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique ID of the franchise.
 *                   prospectName:
 *                     type: string
 *                     description: The name of the prospect.
 *     responses:
 *       200:
 *         description: Payment link sent successfully
 *       400:
 *         description: Bad Request, validation errors
 *       500:
 *         description: Internal server error
 */
router.post('/send-payment-link', leadController_2.sendPaymentLink);
/**
 * @swagger
 * /api/send-digital-contract:
 *   post:
 *     summary: Send digital agreement contract for e-signing
 *     description: Sends the digital agreement contract to the franchisee for e-signing after franchise fee payment.
 *     tags:
 *       - Leads
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the franchisee.
 *               franchiseDetails:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique ID of the franchise.
 *                   prospectName:
 *                     type: string
 *                     description: The name of the prospect.
 *     responses:
 *       200:
 *         description: Digital contract sent successfully
 *       400:
 *         description: Bad Request, validation errors
 *       500:
 *         description: Internal server error
 */
router.post('/send-digital-contract', leadController_2.sendDigitalContract);
/**
 * @swagger
 * /api/send-franchise-login:
 *   post:
 *     summary: Send franchise login credentials after contract signing and payment
 *     description: Sends login credentials to the franchisee after contract signing and payment are completed.
 *     tags:
 *       - Leads
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the franchisee.
 *               franchiseDetails:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique ID of the franchise.
 *                   username:
 *                     type: string
 *                     description: The username for the franchisee login.
 *                   password:
 *                     type: string
 *                     description: The password for the franchisee login.
 *                   prospectName:
 *                     type: string
 *                     description: The name of the prospect.
 *     responses:
 *       200:
 *         description: Franchise login credentials sent successfully
 *       400:
 *         description: Bad Request, validation errors
 *       500:
 *         description: Internal server error
 */
router.post('/send-franchise-login', leadController_2.sendFranchiseLoginCredentials);
/**
 * @swagger
 * /api/leads:
 *   post:
 *     summary: Create a new lead
 *     description: Only admins can create leads in the system.
 *     tags:
 *       - Leads
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lead'
 *     responses:
 *       201:
 *         description: Lead created successfully
 *       403:
 *         description: Forbidden
 */
router.post('/', auth_1.authenticate, (0, auth_1.authorize)('admin'), leadController_1.createLead);
/**
 * @swagger
 * /api/leads:
 *   get:
 *     summary: Get list of leads with filtering options
 *     description: Allows admins to retrieve and filter leads by prospect's details, area, franchise model, date range, and status.
 *     tags:
 *       - Leads
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: prospectName
 *         schema:
 *           type: string
 *         description: Search by prospect's name
 *       - in: query
 *         name: area
 *         schema:
 *           type: string
 *         description: Filter by area
 *       - in: query
 *         name: franchiseModel
 *         schema:
 *           type: string
 *         description: Filter by franchise model
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by start date (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by end date (YYYY-MM-DD)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by lead status
 *     responses:
 *       200:
 *         description: List of filtered leads retrieved successfully
 *       403:
 *         description: Forbidden
 */
router.get('/', auth_1.authenticate, (0, auth_1.authorize)('admin'), leadController_1.getLeads);
exports.default = router;
