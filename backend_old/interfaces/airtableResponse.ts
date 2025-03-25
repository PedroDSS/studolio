import type { FieldSet } from "airtable";

export interface AirtableElement {
  id: string;
  // TODO: retirer le any
  fields: FieldSet | any;
}
export interface AirtableResponse {
  count: number;
  results: AirtableElement[];
}
