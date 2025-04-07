import Image from 'next/image';
import styles from './page.module.css';
import { promises as fs } from 'fs';
import path from 'path';
import { parseLyrics } from './utils/lyrics';
import MusicPlayer from './components/MusicPlayer';

export default async function Home() {
  // 가사 파일 읽기
  let lyrics = [];
  try {
    const lyricsPath = path.join(process.cwd(), 'public/music/PlayGround.txt');
    const lyricsText = await fs.readFile(lyricsPath, 'utf8');
    lyrics = parseLyrics(lyricsText);
  } catch (error) {
    console.error('가사 파일을 읽는 중 오류가 발생했습니다:', error);
  }
  
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            넷플릭스 화제의 드라마<br className={styles.mobileBreak} />
            "폭싹 속았수다"<br className={styles.mobileBreak} />
            광주 ver. 떴다!!😎
          </h1>
        </div>
      </div>

      <section className={styles.container}>
        <MusicPlayer lyrics={lyrics} />
        
        <div className={styles.imageWrapper}>
          <Image
            src="/img/1.jpg"
            alt="폭싹 속았수다 광주 ver. 포스터"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto', maxWidth: '800px' }}
            priority
            className={styles.mainImage}
            draggable="false"
          />
        </div>

        <div className={styles.infoSection}>
          <div className={styles.commentSection}>
            <h2 className={styles.sectionTitle}>💬COMMENT</h2>
            <p className={styles.comment}>"동(童)심으로 돌아가서 현재를 동(動)심하라"</p>
            <p className={styles.commentSub}>BACK TO THE 2000's</p>
            <p className={styles.description}>
              20~30대 모두가 공감할 추억으로<br/>
              인도하는 체험형 전시회가 열립니다!
            </p>
            <p className={styles.description}>
              졸업한지 10년이 지났지만 다시 친구들과 놀이터를 뛰어놀던 그 시절로 스며드는.....
            </p>
          </div>

          <div className={styles.detailsSection}>
            <h2 className={styles.sectionTitle}>🔖DETAILS</h2>
            <div className={styles.zoneInfo}>
              <div className={styles.zone}>
                <h3>📌PAST ZONE</h3>
                <p>→ 추억의 그시절로</p>
              </div>
              
              <div className={styles.zone}>
                <h3>📌PRESENT ZONE</h3>
                <p>→ 내 안의 "인사이드 아웃"</p>
              </div>
              
              <div className={styles.zone}>
                <h3>📌FUTURE ZONE</h3>
                <p>→ 느린 우체국</p>
              </div>
            </div>
          </div>

          <div className={styles.eventInfoSection}>
            <div className={styles.divider}>➖➖➖➖➖➖➖</div>
            <div className={styles.eventDetails}>
              <p><span className={styles.icon}>🚩</span>광주 청년 공간 "하다"</p>
              <p className={styles.address}>(동구 대의동 6-1, 2,3층)</p>
              <p><span className={styles.icon}>📅</span>25.4.11~12 (PM 5-9시)</p>
              <p><span className={styles.icon}>✏️</span>인스타 팔로우하고 행사 포스터 제시하고 입장할시 3,000원으로 할인!</p>
              <p><span className={styles.icon}>✏️</span>모든 방문객분들께 굿즈 증정!</p>
              <p><span className={styles.icon}>✏️</span>한번에 많은 사람이 몰릴수있으니, 참고 부탁드립니다 : )</p>
              <p><span className={styles.icon}>🎆</span>주최 : 청춘미담</p>
              <div className={styles.socialLinks}>
                <a href="https://www.instagram.com/hada_in_gwangju" target="_blank" rel="noopener noreferrer" className={styles.instagramLink}>
                  <i className="fab fa-instagram"></i>
                  <span className={styles.instagramHandle}>@hada_in_gwangju</span>
                </a>
              </div>
            </div>
            <div className={styles.divider}>➖➖➖➖➖➖➖</div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>본 사이트는 행사가 종료되면 사라집니다.</p>
        <p>행사 홍보목적으로 제작된 페이지입니다.</p>
      </footer>
    </main>
  );
}
