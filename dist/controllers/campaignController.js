"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCampaign = exports.updateCampaign = exports.getCampaignById = exports.getCampaigns = exports.createCampaign = void 0;
const campaign_1 = __importDefault(require("../models/campaign"));
// Create a new campaign
const createCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, area, status } = req.body;
        const uniqueCode = Math.random().toString(36).substring(2, 10); // Consider using UUID for better uniqueness
        const campaign = yield campaign_1.default.create({ name, code: uniqueCode, area, status });
        res.status(201).json(campaign);
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to create campaign' });
    }
});
exports.createCampaign = createCampaign;
// Get all campaigns
const getCampaigns = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const campaigns = yield campaign_1.default.findAll();
        res.status(200).json(campaigns);
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to retrieve campaigns' });
    }
});
exports.getCampaigns = getCampaigns;
// Get a campaign by ID
const getCampaignById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const campaign = yield campaign_1.default.findByPk(req.params.id);
        if (campaign) {
            res.status(200).json(campaign);
        }
        else {
            res.status(404).json({ error: 'Campaign not found' });
        }
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to retrieve campaign' });
    }
});
exports.getCampaignById = getCampaignById;
// Update a campaign
const updateCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [updated] = yield campaign_1.default.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedCampaign = yield campaign_1.default.findByPk(req.params.id);
            res.status(200).json(updatedCampaign);
        }
        else {
            res.status(404).json({ error: 'Campaign not found' });
        }
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to update campaign' });
    }
});
exports.updateCampaign = updateCampaign;
// Delete a campaign
const deleteCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield campaign_1.default.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ error: 'Campaign not found' });
        }
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to delete campaign' });
    }
});
exports.deleteCampaign = deleteCampaign;
