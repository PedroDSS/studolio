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
from core.airtable import (
    get_all_airtable,
    get_by_id_airtable,
    create_airtable,
    update_airtable,
    delete_airtable
)

router = APIRouter()
airtable = AirtableService(settings.AIRTABLE_COMMENT)

@router.get("/", response_model=AirtableComment)
async def get_comments():
    return await get_all_airtable(airtable)

@router.get("/{id}", response_model=Comment, dependencies=[Depends(verify_token)])
async def get_comment(id: str):
    return await get_by_id_airtable(airtable, id)

@router.post("/", response_model=Comment, dependencies=[Depends(verify_token)], status_code=201)
async def create_comment(comment: CreateComment):
    return await create_airtable(airtable, comment.dict())

@router.delete("/{id}", dependencies=[Depends(verify_token)], status_code=204)
async def delete_comment(id: str):
    await delete_airtable(airtable, id)
    return Response(status_code=204)

@router.patch("/{id}", response_model=Comment, dependencies=[Depends(verify_token)])
async def update_comment(id: str, comment: UpdateComment):
    return await update_airtable(airtable, id, comment.dict())
