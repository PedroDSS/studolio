import type { FieldSet } from "airtable";

export interface AirtableResponse {
  id: string;
  fields: FieldSet;
}
