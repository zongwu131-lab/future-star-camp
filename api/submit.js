import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);
const phoneRe = /^1[3-9]\d{9}$/;
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: '不支持' });
  try {
    const { name, phone, school, count, companions, note, teacher } = req.body || {};
    if (!name?.trim()) return res.status(400).json({ error: '请填写姓名' });
    if (!phoneRe.test(phone?.trim())) return res.status(400).json({ error: '手机号格式不正确' });
    if (!school?.trim()) return res.status(400).json({ error: '请填写学校' });
    const c = parseInt(count, 10);
    if (!c || c < 1 || c > 20) return res.status(400).json({ error: '人数需在1-20之间' });
    await sql`insert into registrations (name,phone,school,count,companions,note,teacher) values (${name.trim()},${phone.trim()},${school.trim()},${c},${companions||null},${note||null},${teacher||'心语老师'})`;
    return res.status(200).json({ ok: true });
  } catch(err) {
    return res.status(500).json({ error: '服务器错误' });
  }
}
