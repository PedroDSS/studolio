import { database } from "../utils/db.server";

export async function seedEtudiant() {
  const promotions = await database(process.env.AIRTABLE_PROMO as string)
    .select()
    .firstPage();
  const firstPromotion = promotions.length > 0 ? promotions[0] : null;
  const etudiants = [
    {
      fields: {
        Nom: "Kyle",
        Prenom: "Selena",
        Email: "selena.kyle@example.com",
        Promotion: firstPromotion?.id ? [firstPromotion.id] : [],
      },
    },
    {
      fields: {
        Nom: "Wayne",
        Prenom: "Bruce",
        Email: "bruce.wayne@example.com",
        Promotion: firstPromotion?.id ? [firstPromotion.id] : [],
      },
    },
  ];

  try {
    await database(process.env.AIRTABLE_ETUDIANT as string).create(etudiants);
    console.log("Seeding completed successfully (Etudiant).");
  } catch (error) {
    console.error("Error seeding data (Etudiant):", error);
  }
}
