const { ChromaClient } = require("chromadb");
const { OpenAIEmbeddingFunction } = require("chromadb");
const User = require("../models/User");
const Job = require("../models/Job");
const dotenv = require("dotenv");

const { addDocuments } = require("../config/chroma_db");
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const client = new ChromaClient({
  path: "http://localhost:8000",
});
dotenv.config();

const embedder = new OpenAIEmbeddingFunction({
  openai_api_key: OPENAI_API_KEY,
});

const getRecommendedFreelancersForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId).populate("requiredSkills"); // Assuming the field is named 'requiredSkills'

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (!job.requiredSkills || job.requiredSkills.length === 0) {
      return res.status(404).json({ message: "Job doesn't have any skills" });
    }

    const jobSkills = job.requiredSkills.map((skill) => skill.name).join(" ");
    const collection = await client.getCollection({
      name: "freelancers",
      embeddingFunction: embedder,
    });

    const results = await collection.query({
      queryTexts: [jobSkills],
      nResults: 5,
    });

    const recommendedFreelancers = await User.find({
      _id: { $in: results.ids[0] },
    }).select("-password");

    res.json(results);
  } catch (error) {
    console.error("Error in getRecommendedFreelancersForJob:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// probably need to call this every few days to keep the data fresh since users will be added and exisiting users will update their profiles
const embedUsers = async (req, res) => {
  try {
    const allFreelancers = await User.find({ role: "freelancer" }).populate(
      "skills"
    );

    const ids = allFreelancers.map((freelancer) => freelancer._id.toString());
    const documents = allFreelancers.map((freelancer) => {
      const skillNames = freelancer.skills.map((skill) => skill.name).join(" ");
      return `${freelancer.firstName} ${freelancer.lastName} ${skillNames} ${
        freelancer.bio || ""
      }`;
    });
    const metadatas = allFreelancers.map((freelancer) => ({
      id: freelancer._id.toString(),
      avgRating: freelancer.avgRating,
      totalJobs: freelancer.totalJobs,
      location: freelancer.location || "",
      bio: freelancer.bio || "",
      location: freelancer.location || "",
    }));

    const isValidInput = documents.every(
      (doc) => typeof doc === "string" && doc.trim() !== ""
    );
    if (!isValidInput) {
      throw new Error("Invalid input: All documents must be non-empty strings");
    }

    console.log("Prepared data:", {
      ids: ids.slice(0, 3),
      documents: documents.slice(0, 3),
      metadatas: metadatas.slice(0, 3),
    });

    const collection = await client.getOrCreateCollection({
      name: "freelancers",
      embeddingFunction: embedder,
    });

    // upsert adds new and updates old
    await collection.upsert({
      ids: ids,
      documents: documents,
      metadatas: metadatas,
    });

    console.log("Freelancers embedded successfully");
    res.json({ message: "Freelancers embedded successfully" });
  } catch (error) {
    console.error("Error in embedUsers:", error);
  }
};

const peekAtCollection = async (req, res) => {
  const { name: collectionName } = req.params;
  const collection = await client.getCollection({
    name: collectionName,
    embeddingFunction: embedder,
  });

  const peekedData = await collection.peek();
  console.log(peekedData);

  // return peekedData;
  res.json(peekedData);
};

// embedUsers();

module.exports = {
  getRecommendedFreelancersForJob,
  embedUsers,
  peekAtCollection,
};
