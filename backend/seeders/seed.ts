import { seedAdmin } from "./seedAdmin";
import { seedTechno } from "./seedTechno";
import { seedPromotion } from "./seedPromotion";
import { seedCategorie } from "./seedCategorie";
import { seedEtudiant } from "./seedEtudiant";
import { seedProjet } from "./seedProjet";

async function seed() {
  seedTechno();
  seedPromotion();
  seedCategorie();
  seedEtudiant();
  seedAdmin();
  seedProjet();
}

seed();
