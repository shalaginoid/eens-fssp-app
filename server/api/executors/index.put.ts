import { getConnection } from '~~/server/utils/useDatabase';

export default defineEventHandler(async (event) => {
  const { id, executor } = await readBody(event);

  if (!id && !executor) {
    throw createError({
      statusCode: 400,
    });
  }

  const pool = await getConnection();

  await pool.query(
    `UPDATE dbo.Executors SET executor = '${executor}' WHERE id = ${id}`,
  );

  await pool.close();

  setResponseStatus(event, 204);
});
