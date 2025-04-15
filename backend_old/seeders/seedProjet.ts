import { database } from "../utils/db.server";

export async function seedProjet() {
  const categories = await database(process.env.AIRTABLE_CATEGORIE as string)
    .select()
    .firstPage();
  const firstCategory = categories.length > 0 ? categories[0] : null;
  const projet = [
    {
      fields: {
        Nom: "Studolio",
        Description: `Ce projet vise à développer un portfolio interactif pour la filière Ingénierie du Web de l'ESGI. L'objectif est de présenter les projets des étudiants lors des salons et JPO.
            Le projet est divisé en deux parties :
            - Un portfolio accessible au public pour voir et liker les projets.
            - Une interface administrateur permettant de gérer les projets et visualiser les statistiques.`,
        Likes: 100,
        "Mots-clés": "",
        GitHub: "https://github.com/PedroDSS/studolio",
        Visuel: "",
        Catégorie: firstCategory?.id ? [firstCategory.id] : [],
        Étudiants: [],
        Publié: "False",
      },
    },
  ];

  try {
    await database(process.env.AIRTABLE_PROJET as string).create(projet);
    console.log("Seeding completed successfully (Projet).");
  } catch (error) {
    console.error("Error seeding data (Projet):", error);
  }
}
