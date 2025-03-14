export async function getAdmins() {
  const apiUrl = useRuntimeConfig().public.apiUrl;
  try {
    const response = await $fetch(`${apiUrl}/getAdmins`);
    return response;
  } catch (error) {
    console.error("Error fetching admins:", error);
    throw error;
  }
}
