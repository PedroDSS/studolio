import { database } from "../utils/db.server";

export async function seedTechno() {
  const technos = [
    {
      fields: {
        Nom: "React",
      },
    },
    {
      fields: {
        Nom: "TypeScript",
      },
    },
    {
      fields: {
        Nom: "Django",
      },
    },
    {
      fields: {
        Nom: "Python",
      },
    },
  ];

  try {
    await database(process.env.AIRTABLE_TECHNO as string).create(technos);
    console.log("Seeding completed successfully (Techno).");
  } catch (error) {
    console.error("Error seeding data (Techno):", error);
  }
}
