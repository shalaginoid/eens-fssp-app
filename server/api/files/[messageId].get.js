import sql from 'mssql';

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const connString = runtimeConfig.dbConnectionString;
  const messageId = getRouterParam(event, 'messageId');

  await sql.connect(connString);

  const result = await sql.query(`SELECT * FROM dbo.Files WHERE messageId = ${messageId}`);
  const files = result.recordset;

  return files;
});
