import { Request, Response } from 'express';
import Lead from '../models/lead';
import { Op } from 'sequelize';
import { sendEmail } from '../services/mailer';

// Function to trigger sending payment link
export const sendPaymentLink = async (req:Request, res:Response) => {
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
    await sendEmail(email, subject, html);
    res.status(200).json({ message: 'Payment link sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending payment link', error });
  }
};

export const sendDigitalContract = async (req:Request, res:Response) => {
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
    await sendEmail(email, subject, html);
    res.status(200).json({ message: 'Digital contract sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending digital contract', error });
  }
};


export const sendFranchiseLoginCredentials = async (req: Request, res:Response) => {
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
    await sendEmail(email, subject, html);
    res.status(200).json({ message: 'Franchise login credentials sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending login credentials', error });
  }
};




//create the lead
export const createLead = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ error: 'Error creating lead' });
  }
};


//get the lead
export const getLeads = async (req: Request, res: Response) => {
    try {
      const {
        prospectName,
        area,
        franchiseModel,
        startDate,
        endDate,
        status,
      } = req.query;
  
      // Constructing a filter object based on the query parameters provided
      const filter: any = {};
  
      // Filter by prospect's details (e.g., name or contact)
      if (prospectName) {
        filter.prospectName = { [Op.like]: `%${prospectName}%` };
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
        filter.createdAt = { [Op.between]: [new Date(startDate as string), new Date(endDate as string)] };
      } else if (startDate) {
        filter.createdAt = { [Op.gte]: new Date(startDate as string) };
      } else if (endDate) {
        filter.createdAt = { [Op.lte]: new Date(endDate as string) };
      }
  
      // Fetch leads based on the constructed filter
      const leads = await Lead.findAll({ where: filter });
      res.status(200).json(leads);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching leads' });
    }
  };
  