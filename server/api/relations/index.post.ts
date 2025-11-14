import { getConnection } from '~~/server/utils/useDatabase';

export default defineEventHandler(async (event) => {
  const { messageId, statusId, executorId } = await readBody(event);

  if (!messageId || !statusId || !executorId) {
    throw createError({
      statusCode: 400,
    });
  }

  const pool = await getConnection();

  const query = `
    BEGIN TRANSACTION;
      UPDATE dbo.Relations WITH (UPDLOCK, SERIALIZABLE) SET statusId = ${statusId}, executorId = '${executorId}' WHERE MessageID = ${messageId};
    IF @@ROWCOUNT = 0
      BEGIN
        INSERT INTO dbo.Relations (messageId, statusId, executorId) VALUES (${messageId}, ${statusId}, '${executorId}');
      END
    COMMIT TRANSACTION;
  `;

  await pool.query(query);

  await pool.close();

  setResponseStatus(event, 200);
});
