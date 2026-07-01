import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: '不支持' });
  const { password } = req.body || {};
  if (password !== '123456') return res.status(401).json({ error: '密码错误' });
  try {
    await sql`delete from registrations`;
    return res.status(200).json({ ok: true });
  } catch(err) {
    return res.status(500).json({ error: '服务器错误' });
  }
}
