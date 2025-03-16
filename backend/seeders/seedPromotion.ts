import { database } from "../utils/db.server";

export async function seedPromotion() {
  const promotions = [
    {
      fields: {
        Nom: "2024-2025",
      },
    },
    {
      fields: {
        Nom: "2023-2024",
      },
    },
    {
      fields: {
        Nom: "2022-2023",
      },
    },
    {
      fields: {
        Nom: "2021-2022",
      },
    },
  ];

  try {
    await database(process.env.AIRTABLE_PROMO as string).create(promotions);
    console.log("Seeding completed successfully (Promotion).");
  } catch (error) {
    console.error("Error seeding data (Promotion):", error);
  }
}
