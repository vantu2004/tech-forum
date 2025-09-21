import UserExperience from "../models/userExperience.model.js";
import mongoose from "mongoose";

export const getExperience = async (req, res) => {
  try {
    const experienceId = req.params.experienceId;
    if (!mongoose.Types.ObjectId.isValid(experienceId)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const experience = await UserExperience.findOne({
      _id: experienceId,
    });

    if (!experience) {
      return res
        .status(404)
        .json({ success: false, error: "Experience not found" });
    }

    res.status(200).json({ success: true, experience });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getExperiences = async (req, res) => {
  try {
    const userId = req.userId;
    const experiences = await UserExperience.find({ userId });

    res.status(200).json({ success: true, experiences });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const createExperience = async (req, res) => {
  try {
    const userId = req.userId;
    const { designation, company_name, duration, location } = req.body;

    const experience = await UserExperience.create({
      userId,
      designation,
      company_name,
      duration,
      location,
    });

    res.status(201).json({ success: true, experience });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateExperience = async (req, res) => {
  try {
    const experienceId = req.params.experienceId;
    if (!mongoose.Types.ObjectId.isValid(experienceId)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const experience = await UserExperience.findOneAndUpdate(
      { _id: experienceId, userId: req.userId },
      req.body,
      { new: true }
    );

    if (!experience) {
      return res
        .status(404)
        .json({ success: false, error: "Experience not found" });
    }

    res.status(200).json({ success: true, experience });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const experienceId = req.params.experienceId;
    if (!mongoose.Types.ObjectId.isValid(experienceId)) {
      return res.status(400).json({ success: false, error: "Invalid ID" });
    }

    const experience = await UserExperience.findOneAndDelete({
      _id: experienceId,
      userId: req.userId,
    });

    if (!experience) {
      return res
        .status(404)
        .json({ success: false, error: "Experience not found" });
    }

    res.status(200).json({ success: true, message: "Experience deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};
