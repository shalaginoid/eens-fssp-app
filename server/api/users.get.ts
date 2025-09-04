import { Client } from 'ldapts';

export default defineEventHandler(async (event) => {
  const { ldap } = useRuntimeConfig();

  const client = new Client({
    url: 'ldap://eksbyt.ru',
  });

  await client.bind(`eksbyt\\${ldap.username}`, ldap.password);

  const query =
    '(&(objectCategory=user)(memberOf=cn=Госпочта ФССП,ou=Пользователи ОАО ЕЭНС,dc=eksbyt,dc=ru))';

  const { searchEntries } = await client.search('dc=eksbyt,dc=ru', {
    filter: query,
  });

  const users = searchEntries.map((item) => {
    return {
      fullname: item.displayName,
      mail: item.mail,
      department: item.department,
      jobTitle: item.title,
      sessionId: '',
      peerId: '',
    };
  });

  return users.sort(function (a, b) {
    if (a.fullname > b.fullname) {
      return 1;
    }
    if (a.fullname < b.fullname) {
      return -1;
    }
    return 0;
  });
});
