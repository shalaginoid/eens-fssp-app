import { getConnection } from '~~/server/utils/useDatabase';

export default defineEventHandler(async (event) => {
  const { executor } = await readBody(event);

  if (!executor) {
    throw createError({
      statusCode: 400,
    });
  }

  const pool = await getConnection();

  const result = await pool.query(
    `INSERT INTO dbo.Executors (Executor) VALUES ('${executor}') SELECT SCOPE_IDENTITY() as id`,
  );

  await pool.close();

  setResponseStatus(event, 201, JSON.stringify({ id: result.recordset[0].id }));
});
