from core.config import settings
from services.airtable import AirtableService

airtable_etudiants = AirtableService(settings.AIRTABLE_ETUDIANT)
airtable_promotions = AirtableService(settings.AIRTABLE_PROMO)

async def seed_etudiants():
    # Get datas for relations.
    promotions = await airtable_promotions.get_all()
    first_promo_id = promotions[0]["id"] if promotions else None

    # Get the existing datas to be deleted.
    existing_etudiants = await airtable_etudiants.get_all()
    
    # Delete existing datas.
    if existing_etudiants:
        await airtable_etudiants.batch_delete(existing_etudiants)

    # Create new datas.
    etudiants_data = [
        {
            "Nom": "Kyle",
            "Prenom": "Selena",
            "Email": "selena.kyle@example.com",
            "Promotion": [first_promo_id] if first_promo_id else [],
        },
        {
            "Nom": "Wayne",
            "Prenom": "Bruce",
            "Email": "bruce.wayne@example.com",
            "Promotion": [first_promo_id] if first_promo_id else [],
        },
    ]

    await airtable_etudiants.batch_create(etudiants_data)
