export async function clientLoader() {
  return await (
    await fetch(`${import.meta.env.VITE_API_URL}/promotions/`)
  ).json();
}
