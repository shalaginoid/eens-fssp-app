import sql from 'mssql';

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const connString = runtimeConfig.dbConnectionString;

  await sql.connect(connString);

  const result = await sql.query('SELECT * FROM dbo.Statuses');

  return result.recordset;
});
