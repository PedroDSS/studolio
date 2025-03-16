import type { AirtableResponse } from "../../interfaces/airtableResponse";
import { getAdmin } from "./getAdmin";
import { getAdmins } from "./getAdmins";

export async function connectAdmin(
  email: string,
  password: string
): Promise<AirtableResponse | void> {
  const allAdmins = await getAdmins();
  const admin = allAdmins.find((admin) => admin.fields.Email === email);
  if (!admin) {
    throw new Error("Admin not found");
  }
  const isPasswordCorrect = await Bun.password.verify(
    password,
    admin.fields["Mot de passe"] as string
  );
  if (isPasswordCorrect) {
    return await getAdmin(admin.id);
  }
  throw new Error("Wrong Password !");
}
