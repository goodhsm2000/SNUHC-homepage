import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

// GitHub Pages 배포 시 레포 이름으로 basePath 설정 (선택사항)
// 예: https://username.github.io/shape-homepage/ 이면 '/shape-homepage'
// 커스텀 도메인 사용 시 아래 두 줄 제거
const repoName = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  reactCompiler: true,

  // ── Vercel 배포 시: 아래 3줄 모두 제거 ──
  output: 'export',          // 정적 HTML 내보내기
  basePath: repoName,        // GitHub Pages 서브경로 (커스텀 도메인이면 '' 유지)
  images: { unoptimized: true }, // 정적 export에서 next/image 사용 가능
};

export default nextConfig;
