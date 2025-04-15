from fastapi import APIRouter, Depends, Response
from core.auth import verify_token
from core.config import settings
from services.airtable import AirtableService
from models.etudiants import (
    Etudiant,
    CreateEtudiant,
    UpdateEtudiant,
    AirtableEtudiant
)
from core.airtable import (
    get_all_airtable,
    get_by_id_airtable,
    create_airtable,
    update_airtable,
    delete_airtable
)

router = APIRouter()
airtable = AirtableService(settings.AIRTABLE_ETUDIANT)

@router.get("/", response_model=AirtableEtudiant, dependencies=[Depends(verify_token)])
async def get_etudiants():
    return await get_all_airtable(airtable)

@router.get("/{id}", response_model=Etudiant, dependencies=[Depends(verify_token)])
async def get_etudiant(id: str):
    return await get_by_id_airtable(airtable, id)

@router.post("/", response_model=Etudiant, dependencies=[Depends(verify_token)], status_code=201)
async def create_etudiant(etudiant: CreateEtudiant):
    return await create_airtable(airtable, etudiant.dict())

@router.delete("/{id}", dependencies=[Depends(verify_token)], status_code=204)
async def delete_etudiant(id: str):
    await delete_airtable(airtable, id)
    return Response(status_code=204)

@router.patch("/{id}", response_model=Etudiant, dependencies=[Depends(verify_token)])
async def update_etudiant(id: str, etudiant: UpdateEtudiant):
    return await update_airtable(airtable, id, etudiant.dict())
