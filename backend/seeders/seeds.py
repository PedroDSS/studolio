import asyncio
from seeders.seed_technos import seed_technos
from seeders.seed_promotions import seed_promotions
from seeders.seed_categories import seed_categories
from seeders.seed_etudiants import seed_etudiants
from seeders.seed_admins import seed_admins
from seeders.seed_projets import seed_projets

async def seed_all():
    await seed_technos()
    await seed_promotions()
    await seed_categories()
    await seed_etudiants()
    await seed_admins()
    await seed_projets()

if __name__ == "__main__":
    asyncio.run(seed_all())