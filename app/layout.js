import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const notoSansKr = Noto_Sans_KR({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata = {
  title: '연애해 봄? - 광주 청년들의 특별한 연극',
  description: '2025년 3월, 광주 아트홀에서 펼쳐지는 청년들의 특별한 연극 "연애해 봄?". 연극, 밴드, 댄스가 어우러진 특별한 공연을 만나보세요.',
  keywords: '연애해봄, 광주연극, 청년연극, 광주아트홀, 봄연극, 밴드공연, 댄스공연',
  openGraph: {
    title: '연애해 봄? - 광주 청년들의 특별한 연극',
    description: '2025년 3월, 광주 아트홀에서 펼쳐지는 청년들의 특별한 연극',
    images: [
      {
        url: '/img/2.jpg',
        width: 800,
        height: 600,
        alt: '연애해 봄? 연극 포스터',
      },
    ],
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
