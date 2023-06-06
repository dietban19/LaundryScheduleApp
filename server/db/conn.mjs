import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";
console.log("CHECK HERE", process.env.ATLAS_URI);
const client = new MongoClient(connectionString);

let conn;
console.log("\n\n\n\n\n\n\n\n");
console.log(client);
console.log("---------------------------------------");
try {
  conn = await client.connect();
} catch (e) {
  console.error(e);
}

let db = conn.db("customer_data");
console.log("\n\n\n\n\n\n\n\n");
export default db;
