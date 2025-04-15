import Airtable from "airtable";

const database = new Airtable({
  apiKey: process.env.AIRTABLE_KEY,
}).base(process.env.AIRTABLE_BDD as string);

export { database }
