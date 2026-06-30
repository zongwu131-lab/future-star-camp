import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  try {
    const rows = await sql`
      select
        count(*)::int as batches,
        coalesce(sum(count), 0)::int as total_people,
        count(distinct school)::int as school_count
      from registrations
    `;
    return res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: '服务器错误' });
  }
}
