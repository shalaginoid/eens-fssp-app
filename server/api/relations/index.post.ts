import sql from 'mssql';

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const connString = runtimeConfig.dbConnectionString;
  const { messageId, statusId, executorId } = await readBody(event);

  if (!messageId || !statusId || !executorId) {
    throw createError({
      statusCode: 400,
    });
  }

  await sql.connect(connString);

  const query = `
    BEGIN TRANSACTION;
      UPDATE dbo.Relations WITH (UPDLOCK, SERIALIZABLE) SET statusId = ${statusId}, executorId = '${executorId}' WHERE MessageID = ${messageId};
    IF @@ROWCOUNT = 0
      BEGIN
        INSERT INTO dbo.Relations (messageId, statusId, executorId) VALUES (${messageId}, ${statusId}, '${executorId}');
      END
    COMMIT TRANSACTION;
  `;

  await sql.query(query);

  setResponseStatus(event, 200);
});
