-- ============================================
-- 未来星暑假训练营 报名系统 - Neon 数据库初始化脚本
-- 在 Neon 控制台的 SQL Editor 中粘贴并运行一次即可
-- ============================================

create table if not exists registrations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  school text not null,
  count int not null check (count >= 1 and count <= 20),
  companions text,
  note text,
  teacher text not null default '心语老师',
  created_at timestamptz not null default now()
);

-- 说明：本方案不依赖数据库层面的行级权限控制，
-- 而是通过 Vercel 后端接口（/api/*）做密码校验和访问控制，
-- 数据库连接字符串只保存在 Vercel 服务器端环境变量中，
-- 浏览器端始终拿不到数据库密码，是安全的。
