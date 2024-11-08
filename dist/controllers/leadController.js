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
exports.getLeads = exports.createLead = exports.sendFranchiseLoginCredentials = exports.sendDigitalContract = exports.sendPaymentLink = void 0;
const lead_1 = __importDefault(require("../models/lead"));
const sequelize_1 = require("sequelize");
const mailer_1 = require("../services/mailer");
// Function to trigger sending payment link
const sendPaymentLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, franchiseDetails } = req.body; // Get email and franchise details from the request body
    const paymentLink = `https://yourpaymentgateway.com/pay/${franchiseDetails.id}`; // Update with actual payment URL
    const subject = 'Franchise Fee Payment Link';
    const html = `
    <p>Dear ${franchiseDetails.prospectName},</p>
    <p>Thank you for your interest in our franchise program. Please proceed with the payment using the link below:</p>
    <p><a href="${paymentLink}">Pay Franchise Fee</a></p>
    <p>Once the payment is successful, we will proceed with the next steps in the process.</p>
    <p>Best regards,<br>Franchise Team</p>
  `;
    try {
        yield (0, mailer_1.sendEmail)(email, subject, html);
        res.status(200).json({ message: 'Payment link sent successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error sending payment link', error });
    }
});
exports.sendPaymentLink = sendPaymentLink;
const sendDigitalContract = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, franchiseDetails } = req.body;
    const contractLink = `https://yourcontractsigning.com/contract/${franchiseDetails.id}`; // Update with actual contract link
    const subject = 'Franchise Agreement for e-Signing';
    const html = `
    <p>Dear ${franchiseDetails.prospectName},</p>
    <p>Your payment has been successfully received. Please sign the franchise agreement by clicking the link below:</p>
    <p><a href="${contractLink}">Sign Franchise Agreement</a></p>
    <p>Best regards,<br>Franchise Team</p>
  `;
    try {
        yield (0, mailer_1.sendEmail)(email, subject, html);
        res.status(200).json({ message: 'Digital contract sent successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error sending digital contract', error });
    }
});
exports.sendDigitalContract = sendDigitalContract;
const sendFranchiseLoginCredentials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, franchiseDetails } = req.body;
    const loginUrl = `https://yourfranchiseportal.com/login`; // Update with actual login URL
    const loginCredentials = `
    <p>Your franchise login credentials:</p>
    <p>Username: ${franchiseDetails.username}</p>
    <p>Password: ${franchiseDetails.password}</p>
    <p>Login URL: <a href="${loginUrl}">${loginUrl}</a></p>
  `;
    const subject = 'Your Franchise Login Credentials';
    const html = `
    <p>Dear ${franchiseDetails.prospectName},</p>
    <p>Congratulations on completing the process! You can now log in to your franchise portal using the credentials below:</p>
    ${loginCredentials}
    <p>Best regards,<br>Franchise Team</p>
  `;
    try {
        yield (0, mailer_1.sendEmail)(email, subject, html);
        res.status(200).json({ message: 'Franchise login credentials sent successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error sending login credentials', error });
    }
});
exports.sendFranchiseLoginCredentials = sendFranchiseLoginCredentials;
//create the lead
const createLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lead = yield lead_1.default.create(req.body);
        res.status(201).json(lead);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating lead' });
    }
});
exports.createLead = createLead;
//get the lead
const getLeads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { prospectName, area, franchiseModel, startDate, endDate, status, } = req.query;
        // Constructing a filter object based on the query parameters provided
        const filter = {};
        // Filter by prospect's details (e.g., name or contact)
        if (prospectName) {
            filter.prospectName = { [sequelize_1.Op.like]: `%${prospectName}%` };
        }
        // Filter by area
        if (area) {
            filter.area = area;
        }
        // Filter by franchise model
        if (franchiseModel) {
            filter.franchiseModel = franchiseModel;
        }
        // Filter by status
        if (status) {
            filter.status = status;
        }
        // Filter by date range
        if (startDate && endDate) {
            filter.createdAt = { [sequelize_1.Op.between]: [new Date(startDate), new Date(endDate)] };
        }
        else if (startDate) {
            filter.createdAt = { [sequelize_1.Op.gte]: new Date(startDate) };
        }
        else if (endDate) {
            filter.createdAt = { [sequelize_1.Op.lte]: new Date(endDate) };
        }
        // Fetch leads based on the constructed filter
        const leads = yield lead_1.default.findAll({ where: filter });
        res.status(200).json(leads);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching leads' });
    }
});
exports.getLeads = getLeads;
