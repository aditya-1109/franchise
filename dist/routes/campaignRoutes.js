"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const campaignController_1 = require("../controllers/campaignController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Only authenticated admins can create a campaign
router.post('/', auth_1.authenticate, (0, auth_1.authorize)('admin'), campaignController_1.createCampaign);
// Both admins and sales reps can view all campaigns
router.get('/', auth_1.authenticate, campaignController_1.getCampaigns);
// Only authenticated users can view a specific campaign by ID
router.get('/:id', auth_1.authenticate, campaignController_1.getCampaignById);
// Only authenticated admins can update a campaign
router.put('/:id', auth_1.authenticate, (0, auth_1.authorize)('admin'), campaignController_1.updateCampaign);
// Only authenticated admins can delete a campaign
router.delete('/:id', auth_1.authenticate, (0, auth_1.authorize)('admin'), campaignController_1.deleteCampaign);
exports.default = router;
/**
 * @swagger
 * /api/campaigns:
 *   post:
 *     summary: Create a new campaign
 *     description: Only admins can create campaigns.
 *     tags:
 *       - Campaigns
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Campaign'
 *     responses:
 *       201:
 *         description: Campaign created successfully
 *       400:
 *         description: Bad request
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 * /api/campaigns/{id}:
 *   get:
 *     summary: Get a campaign by ID
 *     description: Retrieve a campaign by its unique ID.
 *     tags:
 *       - Campaigns
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Campaign ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Campaign found
 *       404:
 *         description: Campaign not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update an existing campaign
 *     description: Only admins can update a campaign.
 *     tags:
 *       - Campaigns
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Campaign ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Campaign'
 *     responses:
 *       200:
 *         description: Campaign updated successfully
 *       400:
 *         description: Bad request
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Campaign not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a campaign
 *     description: Only admins can delete a campaign.
 *     tags:
 *       - Campaigns
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Campaign ID
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Campaign deleted successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Campaign not found
 *       500:
 *         description: Internal server error
 */
