from fastapi import APIRouter, Depends, Response
from core.auth import verify_token
from core.config import settings
from services.airtable import AirtableService
from models.admins import (
    Administrateur,
    UpdateAdministrateur,
    CreateAdministrateur,
    AirtableAdministrateur
)
from core.airtable import (
    get_all_airtable,
    get_by_id_airtable,
    create_airtable,
    update_airtable,
    delete_airtable
)

router = APIRouter()
airtable = AirtableService(settings.AIRTABLE_ADMIN)

@router.get("/", response_model=AirtableAdministrateur, dependencies=[Depends(verify_token)])
async def get_admins():
    return await get_all_airtable(airtable, params={"fields[]": ["Nom", "Prenom", "Email"]})

@router.get("/{id}", response_model=Administrateur, dependencies=[Depends(verify_token)])
async def get_admin(id: str):
    return await get_by_id_airtable(airtable, id)

@router.post("/", response_model=Administrateur, dependencies=[Depends(verify_token)], status_code=201)
async def create_admin(admin: CreateAdministrateur):
    return await create_airtable(airtable, admin.dict())

@router.delete("/{id}", dependencies=[Depends(verify_token)], status_code=204)
async def delete_admin(id: str):
    await delete_airtable(airtable, id)
    return Response(status_code=204)

@router.patch("/{id}", response_model=Administrateur, dependencies=[Depends(verify_token)])
async def update_admin(id: str, admin: UpdateAdministrateur):
    return await update_airtable(airtable, id, admin.dict())
