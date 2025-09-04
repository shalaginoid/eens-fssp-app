import sql from 'mssql';

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const connString = runtimeConfig.dbConnectionString;
  const { id } = await readBody(event);

  if (!id) {
    throw createError({
      statusCode: 400,
    });
  }

  await sql.connect(connString);
  await sql.query(`DELETE FROM dbo.Executors WHERE id = ${id}`);

  setResponseStatus(event, 200);
});
