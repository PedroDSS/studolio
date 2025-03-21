import type { FieldSet } from "airtable";

interface AirtableElement {
  id: string;
  fields: FieldSet;
}
export interface AirtableResponse {
  data: AirtableElement[];
}
