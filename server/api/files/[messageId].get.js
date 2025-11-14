import { getConnection } from '~~/server/utils/useDatabase';

export default defineEventHandler(async (event) => {
  const pool = await getConnection();

  const messageId = getRouterParam(event, 'messageId');

  const result = await pool.query(
    `SELECT * FROM dbo.Files WHERE messageId = ${messageId}`,
  );

  const files = result.recordset;

  await pool.close();

  return files;
});
