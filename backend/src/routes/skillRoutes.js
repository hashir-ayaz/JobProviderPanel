const router = require("express").Router();
const { getAllSkills } = require("../controllers/skillController");

router.get("/", getAllSkills);

module.exports = router;
