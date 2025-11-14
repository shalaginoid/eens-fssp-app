import sql from 'mssql';

export default defineEventHandler(async (event) => {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1';

  // const date = getRouterParam(event, 'date');

  const { date } = getQuery(event);

  if (!date) {
    throw createError({
      statusCode: 400,
    });
  }

  const runtimeConfig = useRuntimeConfig();
  const connString = runtimeConfig.dbConnectionString;

  await sql.connect(connString);

  const query = `
    SELECT TOP 10
      M.messageId,
      M.data,
      M.notifyId,
      M.notifyDate,
      R.executorId,
      E.executor,
      R.statusId,
      S.status
    FROM Messages M
      LEFT JOIN Relations R ON R.messageId = M.messageId
      LEFT JOIN Statuses S ON S.id = R.statusId
      LEFT JOIN Executors E ON E.id = R.executorId
    WHERE 1 = 1
      AND CONVERT(varchar(7), DATEADD(HOUR, 2, CAST(LEFT(M.notifyDate, 19) AS DATETIME)), 20) = '${date}'
      AND M.data LIKE '%fssp:DocName%'
      AND M.data LIKE '%fssp:DebtorType%'
    ORDER BY M.notifyDate DESC
  `;

  const result = await sql.query(query);

  // Трансформируем массив, чтобы отсеять лишние данные
  const map = result.recordset.map((item) => {
    const parsedData = JSON.parse(item.data);

    if ('data' in parsedData) {
      return {
        id: item.id,
        messageId: +item.messageId,
        notifyId: item.notifyId,
        notifyDate: item.notifyDate,
        executorId: item.executorId,
        executor: item.executor,
        statusId: item.statusId,
        status: item.status,
        'fssp:Id': parsedData.data['fssp:Id'],
        'fssp:DebtorType':
          parsedData.data['fssp:DebtorType'] == 1
            ? 'ЮЛ'
            : parsedData.data['fssp:DebtorType'] == 2
              ? 'ФЛ'
              : parsedData.data['fssp:DebtorType'] == 3
                ? 'ИП'
                : parsedData.data['fssp:DebtorType'],
        'fssp:DbtrName': parsedData.data['fssp:DbtrName'],
        'fssp:DocName': parsedData.data['fssp:DocName'],
        'fssp:DocDate': parsedData.data['fssp:DocDate'],
        'fssp:IpNo': parsedData.data['fssp:IpNo'],
        'fssp:IpRiseDate': parsedData.data['fssp:IpRiseDate'],
        'fssp:TotalArrestDebtSum': parsedData.data['fssp:TotalArrestDebtSum'],
        'fssp:IdDocNo': parsedData.data['fssp:IdDocNo'],
        'fssp:IdDocDate': parsedData.data['fssp:IdDocDate'],
        'fssp:IdDeloNo': parsedData.data['fssp:IdDeloNo'],
        'fssp:IdDeloDate': parsedData.data['fssp:IdDeloDate'],
        'fssp:Spi': parsedData.data['fssp:Spi'],
        'fssp:IdCrdrName': parsedData.data['fssp:IdCrdrName'],
        'fssp:IdDebtSum': parsedData.data['fssp:IdDebtSum'],
      };
    }
  });

  return map;
});
