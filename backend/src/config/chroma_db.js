const { ChromaClient } = require("chromadb");
const { OpenAIEmbeddingFunction } = require("chromadb");
const dotenv = require("dotenv");

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const client = new ChromaClient({
  path: "http://localhost:8000", // Adjust if Chroma is hosted elsewhere
});

const embedder = new OpenAIEmbeddingFunction({
  openai_api_key: OPENAI_API_KEY,
});

const createCollection = async (name) => {
  const collection = await client.createCollection({
    name: name,
    // metadata: { description: "My MERN app collection" },
    embeddingFunction: embedder,
  });
  return collection;
};

const addDocuments = async (collectionName, documentsObject) => {
  const collection = await client.getOrCreateCollection({
    name: collectionName,
    embeddingFunction: embedder,
  });

  await collection.upsert(documentsObject);
};

const queryCollection = async (collectionName, queryTexts) => {
  const collection = await client.getCollection({
    name: collectionName,
    embeddingFunction: embedder,
  });

  const results = await collection.query({
    queryTexts: queryTexts,
    nResults: 4,
  });

  console.log(results);
  return results;
};

const peekCollection = async (collectionName) => {
  const collection = await client.getCollection({
    name: collectionName,
    embeddingFunction: embedder,
  });

  const peek = await collection.peek();
  console.log(peek);

  return peek;
};

// createCollection("users");

// addDocuments("users");

// queryCollection("users", ["what does hashir do", "where does hashir study"]);

// peekCollection("users");

module.exports = {
  createCollection,
  addDocuments,
  queryCollection,
  peekCollection,
};
