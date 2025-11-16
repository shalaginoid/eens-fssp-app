export default defineNuxtPlugin({
  name: 'users',
  async setup() {
    const users = await $fetch('/api/users');

    return {
      provide: {
        users: users,
      },
    };
  },
});
