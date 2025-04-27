from core.config import settings
from core.auth import hash_password
from services.airtable import AirtableService

airtable_admins = AirtableService(settings.AIRTABLE_ADMIN)

async def seed_admins():
    # Get the existing datas to be deleted.
    existing_admins = await airtable_admins.get_all()
    
    # Delete existing datas.
    if existing_admins:
        await airtable_admins.batch_delete(existing_admins)
    
    # Create new datas.
    admins_data = [
        {
            "Nom": "Jane",
            "Prenom": "Doe",
            "Email": "jane.doe@example.com",
            "Mot de passe": hash_password("password123"),
        },
        {
            "Nom": "John",
            "Prenom": "Smith",
            "Email": "john.smith@example.com",
            "Mot de passe": hash_password("password456"),
        },
    ]

    await airtable_admins.batch_create(admins_data)
