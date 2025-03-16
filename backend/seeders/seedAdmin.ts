import { database } from "../utils/db.server";

export async function seedAdmin() {
  const admins = [
    {
      fields: {
        Nom: "Jane",
        Prenom: "Doe",
        Email: "jane.doe@example.com",
        "Mot de passe": await Bun.password.hash("password123", {
          algorithm: "bcrypt",
          cost: 10,
        }),
      },
    },
    {
      fields: {
        Nom: "John",
        Prenom: "Smith",
        Email: "john.smith@example.com",
        "Mot de passe": await Bun.password.hash("password456", {
          algorithm: "bcrypt",
          cost: 10,
        }),
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
