from fastapi import APIRouter
from api.admins.routes import router as admins_router
from api.auth.routes import router as login_router
from api.categories.routes import router as categories_router
from api.etudiants.routes import router as etudiants_router
from api.projets.routes import router as projets_router
from api.promotions.routes import router as promotions_router
from api.technos.routes import router as technos_router
from api.comments.routes import router as comments_router

api_router = APIRouter()

api_router.include_router(login_router, prefix="/login", tags=["login"])
api_router.include_router(admins_router, prefix="/admins", tags=["admins"])
api_router.include_router(categories_router, prefix="/categories", tags=["categories"])
api_router.include_router(etudiants_router, prefix="/etudiants", tags=["etudiants"])
api_router.include_router(projets_router, prefix="/projets", tags=["projets"])
api_router.include_router(promotions_router, prefix="/promotions", tags=["promotions"])
api_router.include_router(technos_router, prefix="/technos", tags=["technos"])
api_router.include_router(comments_router, prefix="/comments", tags=["comments"])