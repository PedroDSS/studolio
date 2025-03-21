import { getToken } from "../../utils/jwtToken";
import { database } from "../../utils/db.server";

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
