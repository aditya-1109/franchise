import { Request, Response } from 'express';
import Campaign from '../models/campaign';

// Create a new campaign
export const createCampaign = async (req: Request, res: Response) => {
  try {
    const { name, area, status } = req.body;
    const uniqueCode = Math.random().toString(36).substring(2, 10); // Consider using UUID for better uniqueness
    const campaign = await Campaign.create({ name, code:uniqueCode, area, status });
    res.status(201).json(campaign);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Failed to create campaign' });
  }
};

// Get all campaigns
export const getCampaigns = async (req: Request, res: Response) => {
  try {
    const campaigns = await Campaign.findAll();
    res.status(200).json(campaigns);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Failed to retrieve campaigns' });
  }
};

// Get a campaign by ID
export const getCampaignById = async (req: Request, res: Response) => {
  try {
    const campaign = await Campaign.findByPk(req.params.id);
    if (campaign) {
      res.status(200).json(campaign);
    } else {
      res.status(404).json({ error: 'Campaign not found' });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Failed to retrieve campaign' });
  }
};

// Update a campaign
export const updateCampaign = async (req: Request, res: Response) => {
  try {
    const [updated] = await Campaign.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedCampaign = await Campaign.findByPk(req.params.id);
      res.status(200).json(updatedCampaign);
    } else {
      res.status(404).json({ error: 'Campaign not found' });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Failed to update campaign' });
  }
};

// Delete a campaign
export const deleteCampaign = async (req: Request, res: Response) => {
  try {
    const deleted = await Campaign.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Campaign not found' });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Failed to delete campaign' });
  }
};
