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

router = APIRouter()
airtable = AirtableService(settings.AIRTABLE_ETUDIANT)

@router.get("/", response_model=AirtableEtudiant, dependencies=[Depends(verify_token)])
async def get_etudiants():
    return await airtable.get_all()

@router.get("/{id}", response_model=Etudiant, dependencies=[Depends(verify_token)])
async def get_etudiant(id: str):
    return await airtable.get_by_id(id)

@router.post("/", response_model=Etudiant, dependencies=[Depends(verify_token)], status_code=201)
async def create_etudiant(etudiant: CreateEtudiant):
    return await airtable.create(etudiant.dict())

@router.delete("/{id}", dependencies=[Depends(verify_token)], status_code=204)
async def delete_etudiant(id: str):
    await airtable.delete(id)
    return Response(status_code=204)

@router.patch("/{id}", response_model=Etudiant, dependencies=[Depends(verify_token)])
async def update_etudiant(id: str, etudiant: UpdateEtudiant):
    return await airtable.update(id, etudiant.dict())
