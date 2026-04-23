import { Client } from 'ldapts';

export default defineEventHandler(async (event) => {
  let client;

  try {
    const { access } = useRuntimeConfig();

    const payload = await readValidatedBody(event, (body) =>
      loginSchema.safeParse(body),
    );

    if (!payload.success) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
      });
    }

    const { email, password } = payload.data;

    const login = email.split('@')[0];

    client = new Client({
      url: 'ldap://eksbyt.ru',
    });

    await client.bind(`eksbyt\\${login}`, password);

    const { searchEntries } = await client.search('dc=eksbyt,dc=ru', {
      filter: `(mail=${email})`,
    });

    const memberOf = searchEntries[0]?.memberOf as Array<string>;

    const memberOfAccounts = access.accounts.includes(
      searchEntries[0]?.sAMAccountName as string,
    );

    const memberOfDepartment = access.departments.includes(
      searchEntries[0]?.department as string,
    );

    const isMemberOfGroup = memberOf.some((el) => el.includes(access.group));

    if (!memberOfAccounts && !memberOfDepartment && !isMemberOfGroup) {
      throw createError({
        statusCode: 403,
      });
    }

    const user = {
      fullname: searchEntries[0]?.cn as string,
      shortname: toShortName(searchEntries[0]?.cn as string),
      login: searchEntries[0]?.sAMAccountName as string,
      mail: searchEntries[0]?.mail as string,
      department: searchEntries[0]?.department as string,
    };

    await setUserSession(event, {
      user,
    });

    return sendNoContent(event, 200);
  } catch (error: any) {
    if (error.name === 'InvalidCredentialsError') {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      });
    } else if (error.statusCode === 403) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden',
      });
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: error.message,
      });
    }
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
