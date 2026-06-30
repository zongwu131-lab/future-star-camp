import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);
const phoneRe = /^1[3-9]\d{9}$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '不支持的请求方法' });
  }
  try {
    const { name, phone, school, count, companions, note, teacher } = req.body || {};

    if (!name || !String(name).trim()) return res.status(400).json({ error: '请填写姓名' });
    if (!phone || !phoneRe.test(String(phone).trim())) return res.status(400).json({ error: '手机号格式不正确' });
    if (!school || !String(school).trim()) return res.status(400).json({ error: '请填写学校名称' });
    const c = parseInt(count, 10);
    if (!c || c < 1 || c > 20) return res.status(400).json({ error: '报名人数需在 1-20 之间' });

    await sql`
      insert into registrations (name, phone, school, count, companions, note, teacher)
      values (${String(name).trim()}, ${String(phone).trim()}, ${String(school).trim()}, ${c},
              ${companions ? String(companions).trim() : null},
              ${note ? String(note).trim() : null},
              ${teacher ? String(teacher).trim() : '心语老师'})
    `;

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: '服务器错误，请稍后重试' });
  }
}
