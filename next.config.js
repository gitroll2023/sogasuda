/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Static HTML 내보내기 설정
  images: {
    unoptimized: true, // 정적 내보내기를 위한 이미지 설정
  },
}

module.exports = nextConfig
