import { Client } from 'ldapts';

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  let client;

  try {
    const { ldap } = useRuntimeConfig();

    client = new Client({
      url: 'ldap://eksbyt.ru',
    });

    await client.bind(`eksbyt\\${ldap.username}`, ldap.password);

    const filter = `(&(objectCategory=person)(objectClass=user)(memberOf=cn=${ldap.group},ou=Пользователи ОАО ЕЭНС,dc=eksbyt,dc=ru)(!(userAccountControl:1.2.840.113556.1.4.803:=2)))`;

    // Все сотрудники
    // const filter = `(&(mail=*@eens.ru)(department=*)(objectCategory=person)(objectClass=user)(!(userAccountControl:1.2.840.113556.1.4.803:=2)))`;

    const { searchEntries } = await client.search(
      'ou=Пользователи ОАО ЕЭНС,dc=eksbyt,dc=ru',
      {
        filter,
        attributes: [
          'displayName',
          'sAMAccountName',
          'mail',
          'physicalDeliveryOfficeName',
          'department',
          'telephoneNumber',
          'telephoneNumber',
          'ipPhone',
          'title',
        ],
      },
    );

    const users = searchEntries.map((item) => {
      return {
        fullname: item.displayName as string,
        shortname: toShortName(item.displayName as string),
        login: item.sAMAccountName as string,
        mail: item.mail as string,
        physicalDeliveryOfficeName: item.physicalDeliveryOfficeName as string,
        department: item.department as string,
        telephoneNumber: item.telephoneNumber as string,
        ipPhone: item.ipPhone as string,
        jobTitle: item.title as string,
        photo: `http://portal/docum/DocLib1/${item.displayName}.jpg`,
      };
    });

    const sortedUsers = users.sort((a, b) =>
      a.fullname.localeCompare(b.fullname),
    );

    return sortedUsers;
  } catch (error: any) {
    console.log(error.message);
  } finally {
    await client?.unbind();
  }
});

// Фамилия + инициалы вместо ФИО
function toShortName(fullName: any) {
  const name = fullName.trim();
  const words = name.split(/[. ]+/).filter((item: any) => item !== '');

  const surname = words[0];
  const firstName = words[1]?.charAt(0) + '.';
  const lastname = words[2]?.charAt(0) + '.';

  return surname + ' ' + firstName + ' ' + lastname;
}
