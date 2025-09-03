import { Client } from 'ldapts';

export default defineEventHandler(async (event) => {
  const validation = await readValidatedBody(event, (body) =>
    loginSchema.safeParse(body),
  );

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request',
    });
  }

  const { email, password } = validation.data;

  const client = new Client({
    url: 'ldap://eksbyt.ru',
  });

  try {
    await client.bind(`eksbyt\\${email.split('@')[0]}`, password);

    const { searchEntries } = await client.search('dc=eksbyt,dc=ru', {
      filter: `(mail=${email})`,
    });

    const mailGroupString =
      'CN=Сервис почтовых рассылок,OU=Пользователи ОАО ЕЭНС,DC=eksbyt,DC=ru';
    const memberOf = searchEntries[0].memberOf as Array<string>;

    const isMailGroupMember = memberOf.includes(mailGroupString);

    if (!isMailGroupMember) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden',
      });
    }

    const user = {
      fullname: searchEntries[0].cn,
      firstname: searchEntries[0].givenName,
      lastname: searchEntries[0].sn,
      initials: searchEntries[0].initials,
      login: searchEntries[0].sAMAccountName,
      mail: searchEntries[0].mail,
      department: searchEntries[0].department,
      jobTitle: searchEntries[0].title,
      telephoneNumber: searchEntries[0].telephoneNumber,
    };

    await setUserSession(event, {
      user: user,
    });
  } catch (error: any) {
    if (error.message === 'Forbidden') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden',
      });
    }

    if (error.message.includes('ECONNREFUSED')) {
      throw createError({
        statusCode: 421,
        statusMessage: 'ECONNREFUSED',
      });
    }

    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid username or password',
    });
  } finally {
    await client.unbind();
  }

  return sendNoContent(event, 200);
});
