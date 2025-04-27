from fastapi import APIRouter, Depends, Response
from core.auth import hash_password, verify_token
from core.config import settings
from services.airtable import AirtableService
from models.admins import (
    Administrateur,
    UpdateAdministrateur,
    CreateAdministrateur,
    AirtableAdministrateur,
    UpdateAdministrateurPassword
)

router = APIRouter()
airtable = AirtableService(settings.AIRTABLE_ADMIN)

@router.get("/", response_model=AirtableAdministrateur, dependencies=[Depends(verify_token)])
async def get_admins():
    return await airtable.get_all()

@router.get("/{id}", response_model=Administrateur, dependencies=[Depends(verify_token)])
async def get_admin(id: str):
    return await airtable.get_by_id(id)

@router.post("/", response_model=Administrateur, dependencies=[Depends(verify_token)], status_code=201)
async def create_admin(admin: CreateAdministrateur):
    admin.Password = hash_password(admin.Password)
    return await airtable.create(admin.dict())

@router.delete("/{id}", dependencies=[Depends(verify_token)], status_code=204)
async def delete_admin(id: str):
    await airtable.delete(id)
    return Response(status_code=204)

@router.patch("/{id}", response_model=Administrateur, dependencies=[Depends(verify_token)])
async def update_admin(id: str, admin: UpdateAdministrateur):
    return await airtable.update(id, admin.dict())

@router.patch("/password/{id}", response_model=Administrateur, dependencies=[Depends(verify_token)])
async def update_admin_password(id: str, admin: UpdateAdministrateurPassword):
    admin.Password = hash_password(admin.Password)
    return await airtable.update(id, admin.dict())