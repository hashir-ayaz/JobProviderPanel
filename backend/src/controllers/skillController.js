const Skill = require("../models/Skill");
exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (error) {
    console.error("Error fetching skills:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
