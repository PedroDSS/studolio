from core.config import settings
from services.airtable import AirtableService

airtable_projets = AirtableService(settings.AIRTABLE_PROJET)
airtable_categories = AirtableService(settings.AIRTABLE_CATEGORIE)

async def seed_projets():
    # Get datas for relations.
    categories = await airtable_categories.get_all()
    first_category = categories[0]["id"] if categories else None

    # Get the existing datas to be deleted.
    existing_projets = await airtable_projets.get_all()

    # Delete existing datas.
    if existing_projets:
        await airtable_projets.batch_delete(existing_projets)

    # Create new datas.
    projets_data = [
        {
            "Nom": "Studolio",
            "Description": """Ce projet vise à développer un portfolio interactif pour la filière Ingénierie du Web de l'ESGI. L'objectif est de présenter les projets des étudiants lors des salons et JPO.
            Le projet est divisé en deux parties :
            - Un portfolio accessible au public pour voir et liker les projets.
            - Une interface administrateur permettant de gérer les projets et visualiser les statistiques.""",
            "Likes": 100,
            "Mots-clés": "",
            "GitHub": "https://github.com/PedroDSS/studolio",
            "Visuel": "",
            "Catégorie": [first_category] if first_category else [],
            "Étudiants": [],
            "Publié": "False",
        }
    ]

    await airtable_projets.batch_create(projets_data)
