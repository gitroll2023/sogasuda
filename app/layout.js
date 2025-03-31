import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const notoSansKr = Noto_Sans_KR({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata = {
  title: '폭싹 속았수다 광주 ver. - 2000년대 추억 체험 팝업 스토어',
  description: '동(童)심으로 돌아가서 현재를 동(動)심하라! 2030대 모두가 공감할 추억으로 인도하는 체험형 팝업 스토어. 광주 청년 공간 "하다"에서 2025년 4월 11-12일 개최.',
  keywords: '폭싹 속았수다, 광주, 팝업 스토어, 2000년대, 추억, 체험, 청춘미담, 청년 공간 하다, 동심, 인사이드 아웃, 느린 우체국',
  openGraph: {
    title: '폭싹 속았수다 광주 ver. - 2000년대 추억 체험 팝업 스토어',
    description: "동(童)심으로 돌아가서 현재를 동(動)심하라! BACK TO THE 2000's. 20~30대 모두가 공감할 추억으로 인도하는 체험형 팝업 스토어.",
    images: [
      {
        url: 'http://sogasuda.kro.kr/img/2.jpg',
        width: 800,
        height: 600,
        alt: '폭싹 속았수다 광주 ver. 포스터',
      },
    ],
    siteName: '폭싹 속았수다 광주 ver.',
    locale: 'ko_KR',
    type: 'website',
  },
  verification: {
    google: 'UEFedNALtESw4sbZOz8g0EZA-7rPXxcNOpeKGCwV9Fg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <meta name="google-site-verification" content="UEFedNALtESw4sbZOz8g0EZA-7rPXxcNOpeKGCwV9Fg" />
      </head>
      <body className={notoSansKr.className}>
        {children}
        <Script id="prevent-right-click-and-devtools">
          {`
            // 우클릭 방지
            document.addEventListener('contextmenu', (e) => e.preventDefault());
            
            // 복사 방지
            document.addEventListener('keydown', (e) => {
              if (e.ctrlKey && (e.key === 'c' || e.key === 'C')) {
                e.preventDefault();
              }
              // F12 키 방지
              if (e.key === 'F12') {
                e.preventDefault();
              }
              // Ctrl+Shift+I 방지
              if (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I')) {
                e.preventDefault();
              }
              // Ctrl+Shift+J 방지
              if (e.ctrlKey && e.shiftKey && (e.key === 'j' || e.key === 'J')) {
                e.preventDefault();
              }
              // Ctrl+Shift+C 방지
              if (e.ctrlKey && e.shiftKey && (e.key === 'c' || e.key === 'C')) {
                e.preventDefault();
              }
              // Ctrl+U 방지 (소스 보기)
              if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
                e.preventDefault();
              }
            });

            // 개발자 도구 방지
            function preventDevTools() {
              const devtools = {
                isOpen: false,
                orientation: undefined
              };
              
              const threshold = 160;
              
              const emitEvent = (isOpen, orientation) => {
                window.dispatchEvent(new CustomEvent('devtoolschange', {
                  detail: {
                    isOpen,
                    orientation
                  }
                }));
              };

              setInterval(() => {
                const widthThreshold = window.outerWidth - window.innerWidth > threshold;
                const heightThreshold = window.outerHeight - window.innerHeight > threshold;
                const orientation = widthThreshold ? 'vertical' : 'horizontal';

                if (
                  !(heightThreshold && widthThreshold) &&
                  ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)
                ) {
                  if (!devtools.isOpen || devtools.orientation !== orientation) {
                    emitEvent(true, orientation);
                    window.location.reload();
                  }

                  devtools.isOpen = true;
                  devtools.orientation = orientation;
                } else {
                  if (devtools.isOpen) {
                    emitEvent(false, undefined);
                  }

                  devtools.isOpen = false;
                  devtools.orientation = undefined;
                }
              }, 500);

              // 콘솔 출력 방지
              Object.defineProperty(window, 'console', {
                get: () => ({
                  log: () => {},
                  warn: () => {},
                  error: () => {},
                  debug: () => {}
                })
              });
            }

            // 함수 실행
            preventDevTools();
          `}
        </Script>
      </body>
    </html>
  );
}
