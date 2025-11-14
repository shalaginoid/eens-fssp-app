import { getConnection } from '~~/server/utils/useDatabase';

export default defineEventHandler(async (event) => {
  const pool = await getConnection();

  const inProgress = `
      WITH STATUSES AS (
        SELECT
          S.status,
          CONVERT(varchar(7), DATEADD(HOUR, 2, CAST(LEFT(M.notifyDate, 19) AS DATETIME)), 20) month
        FROM dbo.Messages M
          INNER JOIN dbo.Relations R ON R.messageId = M.messageId
          LEFT JOIN dbo.Statuses S ON S.id = R.statusId
      )
      SELECT
        S.month,
        S.status,
        COUNT(S.status) quantity
      FROM STATUSES S
      WHERE S.status = 'В работе'
      GROUP BY S.month, S.status
    `;

  const completed = `
      WITH STATUSES AS (
        SELECT
          S.status,
          CONVERT(varchar(7), DATEADD(HOUR, 2, CAST(LEFT(M.notifyDate, 19) AS DATETIME)), 20) month
        FROM dbo.Messages M
          INNER JOIN dbo.Relations R ON R.messageId = M.messageId
          LEFT JOIN dbo.Statuses S ON S.id = R.statusId
      )
      SELECT
        S.month,
        S.status,
        COUNT(S.status) quantity
      FROM STATUSES S
      WHERE S.status = 'Завершено'
      GROUP BY S.month, S.status
    `;

  const accepted = `
      WITH STATUSES AS (
        SELECT
          case when S.status is null then 'Принято' else S.status end status,
          CONVERT(varchar(7), DATEADD(HOUR, 2, CAST(LEFT(M.notifyDate, 19) AS DATETIME)), 20) month
        FROM dbo.Messages M
          LEFT JOIN dbo.Relations R ON R.messageId = M.messageId
          LEFT JOIN dbo.Statuses S ON S.id = R.statusId
      )
      SELECT
        S.month,
        S.status,
        COUNT(S.status) quantity
      FROM STATUSES S
      WHERE S.status = 'Принято'
      GROUP BY S.month, S.status
    `;

  const inProgressResult = await pool.query(inProgress);
  const completedResult = await pool.query(completed);
  const acceptedResult = await pool.query(accepted);

  const inProgressRecordset = inProgressResult.recordset;
  const completedRecordset = completedResult.recordset;
  const acceptedRecordset = acceptedResult.recordset;

  await pool.close();

  return {
    accepted: acceptedRecordset,
    inProgress: inProgressRecordset,
    completed: completedRecordset,
  };
});
