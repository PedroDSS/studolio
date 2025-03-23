import { database } from "../utils/db.server";
import { getToken } from "../utils/jwtToken";
import { hashPassword } from "../utils/hashPassword";
import type { Administrateur } from "../interfaces/administrateur";
import type { UpdateAdministrateur } from "../interfaces/administrateur";
import type { AirtableElement, AirtableResponse } from "../interfaces/airtableResponse";


export async function connectAdmin(
    email: string,
    password: string
): Promise<string | Response> {
    const allAdmins = await database(process.env.AIRTABLE_ADMIN as string)
        .select()
        .all();
    const admin = allAdmins.find((admin) => admin.fields.Email === email);
    if (!admin) {
        return new Response("Admin not found", { status: 404 });
    }
    const isPasswordCorrect = await Bun.password.verify(
        password,
        admin.fields["Mot de passe"] as string
    );
    if (isPasswordCorrect) {
        const accessToken = await getToken({ id: admin.id }, "1d");
        return accessToken;
    }
    return new Response("Wrong password", { status: 401 });
}

export async function getAdmins(): Promise<AirtableResponse> {
    try {
        const records = await database(process.env.AIRTABLE_ADMIN as string)
            .select()
            .all();

        return {
            count: records.length,
            results: records.map((record: AirtableElement) => ({
                id: record.id,
                fields: record.fields,
            })),
        };
    } catch (error) {
        console.error("Error fetching admins:", error);
        throw error;
    }
}

export async function getAdmin(id: string): Promise<AirtableElement> {
    const record = await database(process.env.AIRTABLE_ADMIN as string).find(id);

    return {
        id: record.id,
        fields: record.fields,
    }
}

export async function createAdmin(
    params: Administrateur
): Promise<AirtableElement> {
    const record = await database(process.env.AIRTABLE_ADMIN as string).create({
        Nom: params.Nom,
        Prenom: params.Prenom,
        Email: params.Email,
        "Mot de passe": await hashPassword(params["Mot de passe"]),
    });

    return {
        id: record.id,
        fields: record.fields,
    }
}

export async function updateAdmin(
    id: string,
    params: UpdateAdministrateur
): Promise<AirtableElement> {
    const record = await database(process.env.AIRTABLE_ADMIN as string).update(
        id,
        {
            Nom: params.Nom,
            Prenom: params.Prenom,
            Email: params.Email,
        }
    );

    return {
        id: record.id,
        fields: record.fields,
    }
}

export async function updatePasswordAdmin(
    id: string,
    password: Administrateur["Mot de passe"]
): Promise<AirtableElement> {
    const record = await database(process.env.AIRTABLE_ADMIN as string).update(
        id,
        {
            "Mot de passe": await hashPassword(password),
        }
    );

    return {
        id: record.id,
        fields: record.fields,
    }
}

export async function deleteAdmin(id: string): Promise<void> {
    await database(process.env.AIRTABLE_ADMIN as string).destroy(id);
}