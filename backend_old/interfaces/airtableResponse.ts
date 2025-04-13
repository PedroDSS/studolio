import type { FieldSet } from "airtable";

export interface AirtableElement {
  id: string;
  fields: FieldSet;
}
export interface AirtableResponse {
  count: number;
  results: AirtableElement[];
}
