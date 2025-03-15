export async function getAdmins() {
  const apiUrl = useRuntimeConfig().public.apiUrl;
  const data = $fetch(`${apiUrl}/getAdmins`);
  return data;
}
