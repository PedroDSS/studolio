from fastapi import APIRouter, Depends, Response
from core.auth import verify_token
from core.config import settings
from services.airtable import AirtableService
from models.comments import (
    Comment,
    CreateComment,
    UpdateComment,
    AirtableComment
)

router = APIRouter()
airtable = AirtableService(settings.AIRTABLE_COMMENT)

@router.get("/", response_model=AirtableComment)
async def get_comments():
    return await airtable.get_all()

@router.get("/{id}", response_model=Comment, dependencies=[Depends(verify_token)])
async def get_comment(id: str):
    return await airtable.get_by_id(id)

@router.post("/", response_model=Comment, dependencies=[Depends(verify_token)], status_code=201)
async def create_comment(comment: CreateComment, payload: dict = Depends(verify_token)):
    comment.Administrateur = [payload.get("id")]
    return await airtable.create(comment.dict())

@router.delete("/{id}", dependencies=[Depends(verify_token)], status_code=204)
async def delete_comment(id: str):
    await airtable.delete(id)
    return Response(status_code=204)

@router.patch("/{id}", response_model=Comment, dependencies=[Depends(verify_token)])
async def update_comment(id: str, comment: UpdateComment):
    return await airtable.update(id, comment.dict())
