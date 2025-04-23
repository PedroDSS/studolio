from core.config import settings
from services.airtable import AirtableService

airtable = AirtableService(settings.AIRTABLE_TECHNO)

async def seed_technos():
    # Get the existing datas to be deleted.
    existing_technos = await airtable.get_all()
    
    # Delete existing datas.
    if existing_technos:
        await airtable.batch_delete(existing_technos)

    # Create new datas.
    technos_data = [
        {"Nom": "React"},
        {"Nom": "TypeScript"},
        {"Nom": "Django"},
        {"Nom": "Python"},
    ]
    await airtable.batch_create(technos_data)
