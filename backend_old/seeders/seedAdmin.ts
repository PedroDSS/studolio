import { database } from "../utils/db.server";
import { hashPassword } from "../utils/hashPassword";

export async function seedAdmin() {
  const admins = [
    {
      fields: {
        Nom: "Jane",
        Prenom: "Doe",
        Email: "jane.doe@example.com",
        "Mot de passe": await hashPassword("password123"),
      },
    },
    {
      fields: {
        Nom: "John",
        Prenom: "Smith",
        Email: "john.smith@example.com",
        "Mot de passe": await hashPassword("password456"),
      },
    },
  ];

  try {
    await database(process.env.AIRTABLE_ADMIN as string).create(admins);
    console.log("Seeding completed successfully (Admin).");
  } catch (error) {
    console.error("Error seeding data (Admin):", error);
  }
}
