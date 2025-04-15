from fastapi import APIRouter, HTTPException
from core.airtable import get_all_airtable
from core.auth import verify_password, create_access_token
from core.config import settings
from models.auth import Login, LoginResponse
from services.airtable import AirtableService

router = APIRouter()
airtable = AirtableService(settings.AIRTABLE_ADMIN)

@router.post("/", response_model=LoginResponse)
async def login(body: Login):
    all_admins = await get_all_airtable(airtable)
    admin = next((admin for admin in all_admins["records"] if admin['fields'].get('Email') == body.email), None)

    if not admin:
        raise HTTPException(status_code=404)
    
    hashed_password = admin['fields'].get('Mot de passe')
    if not verify_password(body.password, hashed_password):
        raise HTTPException(status_code=401, detail="Unauthorized")

    access_token = create_access_token(data={"id": admin['id'], "email": admin['fields'].get('Email')})
    return LoginResponse(token=access_token)