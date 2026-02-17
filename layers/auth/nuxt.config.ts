import pkg from '../../package.json';

export default defineNuxtConfig({
  modules: ['nuxt-auth-utils'],
  nitro: {
    experimental: {
      websocket: true,
    },
  },
  runtimeConfig: {
    ldap: {
      username: 'tfsiis',
      password: 'Dem@Gandu42!HH7',
      group: pkg.description,
    },
    session: {
      name: pkg.name,
      password: '456945b8c6c84388bqwe08768afe17f6',
      cookie: {
        sameSite: 'lax',
        secure: false,
      },
    },
    ntlm: {
      username: 'sharepoint',
      password: '1q2w#E$R',
      domain: 'eksbyt',
    },
  },
});
