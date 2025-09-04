import sql from 'mssql';

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const connString = runtimeConfig.dbConnectionString;
  const { id, executor } = await readBody(event);

  if (!id && !executor) {
    throw createError({
      statusCode: 400,
    });
  }

  await sql.connect(connString);
  await sql.query(`UPDATE dbo.Executors SET executor = '${executor}' WHERE id = ${id}`);

  setResponseStatus(event, 204);
});
