import { OpportunityService } from '../services/opportunityService.js';
import { validateOpportunity } from '../validators/opportunityValidator.js';

export const createOpportunity = async (req, res) => {
  try {
    const employerId = req.user?.id && req.user.id.length === 36 ? req.user.id : 'a1b2c3d4-e5f6-4890-abcd-ef1234567890';
    const isDraft = req.query.draft === 'true' || req.body.status === 'DRAFT';

    const { isValid, errors } = validateOpportunity(req.body, isDraft);
    if (!isValid) {
      console.warn("   ⚠️ [422 Validation Error Details]:", errors);
      return res.status(422).json({
        success: false,
        message: "Validation failed for opportunity posting.",
        errors
      });
    }

    const opportunity = await OpportunityService.createOpportunity(employerId, req.body, isDraft);
    res.status(201).json({
      success: true,
      message: isDraft ? "Opportunity draft saved successfully." : "Opportunity published successfully across Rajasthan.",
      data: opportunity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create opportunity.",
      error: error.message
    });
  }
};

export const getOpportunities = async (req, res) => {
  try {
    const employerId = req.user?.id && req.user.id.length === 36 ? req.user.id : 'a1b2c3d4-e5f6-4890-abcd-ef1234567890';
    const { type, status } = req.query;

    const list = await OpportunityService.getAllOpportunities(employerId, { type, status });
    res.json({
      success: true,
      count: list.length,
      data: list
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load opportunities.",
      error: error.message
    });
  }
};

export const getOpportunityById = async (req, res) => {
  try {
    const { id } = req.params;
    const opp = await OpportunityService.getOpportunityById(id);
    if (!opp) {
      return res.status(404).json({ success: false, message: "Opportunity not found." });
    }
    res.json({ success: true, data: opp });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load opportunity details.",
      error: error.message
    });
  }
};

export const updateOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await OpportunityService.updateOpportunity(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: "Opportunity not found." });
    }
    res.json({
      success: true,
      message: "Opportunity updated successfully.",
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update opportunity.",
      error: error.message
    });
  }
};

export const publishOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    const opp = await OpportunityService.getOpportunityById(id);
    if (!opp) {
      return res.status(404).json({ success: false, message: "Opportunity not found." });
    }

    const { isValid, errors } = validateOpportunity(opp, false);
    if (!isValid) {
      return res.status(422).json({
        success: false,
        message: "Cannot publish: Opportunity is missing required criteria.",
        errors
      });
    }

    const published = await OpportunityService.updateStatus(id, 'PUBLISHED');
    res.json({
      success: true,
      message: "Opportunity published live across Rajasthan!",
      data: published
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to publish opportunity.",
      error: error.message
    });
  }
};

export const closeOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    const closed = await OpportunityService.updateStatus(id, 'CLOSED');
    res.json({
      success: true,
      message: "Opportunity marked as closed.",
      data: closed
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to close opportunity.",
      error: error.message
    });
  }
};

export const deleteOpportunity = async (req, res) => {
  try {
    const { id } = req.params;
    await OpportunityService.deleteOpportunity(id);
    res.json({
      success: true,
      message: "Opportunity deleted successfully."
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete opportunity.",
      error: error.message
    });
  }
};
