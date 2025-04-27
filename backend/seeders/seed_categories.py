from core.config import settings
from services.airtable import AirtableService

airtable = AirtableService(settings.AIRTABLE_CATEGORIE)

async def seed_categories():
    # Get the existing datas to be deleted.
    existing_categories = await airtable.get_all()

    # Delete existing datas.
    if existing_categories:
        await airtable.batch_delete(existing_categories)
        
    # Create new datas.
    categories_data = [
        {"Nom": "UX UI"},
        {"Nom": "Web"},
        {"Nom": "Mobile"},
    ]
    await airtable.batch_create(categories_data)
