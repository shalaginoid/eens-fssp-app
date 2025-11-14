import { getConnection } from '~~/server/utils/useDatabase';

export default defineEventHandler(async (event) => {
  const { id } = await readBody(event);

  if (!id) {
    throw createError({
      statusCode: 400,
    });
  }

  const pool = await getConnection();

  await pool.query(`DELETE FROM dbo.Executors WHERE id = ${id}`);
  await pool.close();

  setResponseStatus(event, 200);
});
