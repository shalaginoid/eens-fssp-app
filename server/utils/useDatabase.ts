import sql from 'mssql';

const { mssql } = useRuntimeConfig();

export async function getConnection() {
  try {
    const pool = await sql.connect(mssql);
    return pool;
  } catch (err) {
    throw createError({
      statusCode: 503,
      message: err as string,
    });
  }
}
