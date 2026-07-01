import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: '不支持' });
  const { password } = req.body || {};
  if (password !== '123456') return res.status(401).json({ error: '密码错误' });
  try {
    const rows = await sql`select * from registrations order by created_at desc`;
    return res.status(200).json({ rows });
  } catch(err) {
    return res.status(500).json({ error: '服务器错误' });
  }
}
