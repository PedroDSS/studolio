from core.config import settings
from services.airtable import AirtableService

airtable = AirtableService(settings.AIRTABLE_PROMO)

async def seed_promotions():
    # Get the existing datas to be deleted.
    existing_promotions = await airtable.get_all()
    
    # Delete existing datas.
    if existing_promotions:
        await airtable.batch_delete(existing_promotions)

    # Create new datas.
    promotions_data = [
        {"Nom": "2024-2025"},
        {"Nom": "2023-2024"},
        {"Nom": "2022-2023"},
        {"Nom": "2021-2022"},
    ]
    await airtable.batch_create(promotions_data)
