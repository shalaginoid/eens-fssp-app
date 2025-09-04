import sql from 'mssql';

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const connString = runtimeConfig.dbConnectionString;
  const { executor } = await readBody(event);

  if (!executor) {
    throw createError({
      statusCode: 400,
    });
  }

  await sql.connect(connString);

  const result = await sql.query(
    `INSERT INTO dbo.Executors (Executor) VALUES ('${executor}') SELECT SCOPE_IDENTITY() as id`
  );

  setResponseStatus(event, 201, JSON.stringify({ id: result.recordset[0].id }));
});
