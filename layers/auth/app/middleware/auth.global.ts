export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn, clear: clearSession } = useUserSession();

  if (!loggedIn.value && to.path !== '/login') {
    await clearSession();
    return navigateTo('/login');
  }
});
