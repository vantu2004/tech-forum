import UserSkill from "../models/userSkill.model.js";

export const getSkills = async (req, res) => {
  try {
    const userId = req.userId;
    const doc = await UserSkill.findOne({ userId });
    res.json({ success: true, skills: doc?.skills || [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to fetch skills" });
  }
};

export const getSkillsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const doc = await UserSkill.findOne({ userId });
    res.json({ success: true, skills: doc?.skills || [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to fetch skills" });
  }
};

export const updateSkills = async (req, res) => {
  try {
    const userId = req.userId;
    const { skills } = req.body; // client gửi { skills: ["JS", "React"] }

    if (!Array.isArray(skills)) {
      return res
        .status(400)
        .json({ success: false, error: "Skills must be an array of strings" });
    }

    const doc = await UserSkill.findOneAndUpdate(
      { userId },
      { $set: { skills } },
      { new: true, upsert: true }
    );

    res.json({ success: true, skills: doc.skills });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to update skills" });
  }
};
