import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);
const ADMIN_PASSWORD = '123456';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '不支持的请求方法' });
  }
  try {
    const { password } = req.body || {};
    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: '密码错误' });
    }
    const rows = await sql`
      select id, name, phone, school, count, companions, note, teacher, created_at
      from registrations
      order by created_at desc
    `;
    return res.status(200).json({ rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: '服务器错误' });
  }
}
