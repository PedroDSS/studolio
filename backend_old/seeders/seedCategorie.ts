import { database } from "../utils/db.server";

export async function seedCategorie() {
  const categories = [
    {
      fields: {
        Nom: "UX UI",
      },
    },
    {
      fields: {
        Nom: "Web",
      },
    },
    {
      fields: {
        Nom: "Mobile",
      },
    },
  ];

  try {
    await database(process.env.AIRTABLE_CATEGORIE as string).create(categories);
    console.log("Seeding completed successfully (Categorie).");
  } catch (error) {
    console.error("Error seeding data (Categorie):", error);
  }
}
