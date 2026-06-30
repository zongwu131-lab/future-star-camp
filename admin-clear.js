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
    await sql`delete from registrations`;
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: '服务器错误' });
  }
}
