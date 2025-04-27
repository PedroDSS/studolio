import asyncio
from .seed_technos import seed_technos
from .seed_promotions import seed_promotions
from .seed_categories import seed_categories
from .seed_etudiants import seed_etudiants
from .seed_admins import seed_admins
from .seed_projets import seed_projets

async def seed_all():
    await seed_technos()
    await seed_promotions()
    await seed_categories()
    await seed_etudiants()
    await seed_admins()
    await seed_projets()

if __name__ == "__main__":
    asyncio.run(seed_all())
