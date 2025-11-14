import { getConnection } from '~~/server/utils/useDatabase';

export default defineEventHandler(async (event) => {
  const pool = await getConnection();

  const result = await pool.query('SELECT * FROM dbo.Statuses');

  await pool.close();

  return result.recordset;
});
