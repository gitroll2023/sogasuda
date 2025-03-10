import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            <span className={styles.questionMark}>?</span>
            광주 연애해 봄
          </h1>
          <p className={styles.subtitle}>광주 청년들의 특별한 이야기</p>
        </div>
      </div>

      <section className={styles.container}>
        <div className={styles.imageWrapper}>
          <Image
            src="/img/1.jpg"
            alt="광주 연애해봄 연극 포스터 - 2025년 3월 공연"
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
          <div className={styles.dateLocation}>
            <div className={styles.infoCard}>
              <i className="far fa-calendar-alt"></i>
              <h3>공연 일정</h3>
              <p>2025년 3월 22일(토) / 29일(토)</p>
              <p className={styles.highlight}>오후 3시 (15:00)</p>
            </div>
            
            <div className={styles.infoCard}>
              <i className="fas fa-map-marker-alt"></i>
              <h3>공연 장소</h3>
              <p>광주광역시</p>
              <p className={styles.highlight}>광주 아트홀</p>
            </div>
          </div>

          <div className={styles.priceSection}>
            <div className={styles.priceCard}>
              <h3>특별 할인 티켓</h3>
              <div className={styles.priceInfo}>
                <div className={styles.priceGroup}>
                  <span className={styles.originalPrice}>10,000원</span>
                  <span className={`${styles.arrow} ${styles.desktopOnly}`}>→</span>
                  <span className={`${styles.arrow} ${styles.mobileOnly}`}>▼</span>
                </div>
                <span className={styles.discountPrice}>5,000원</span>
              </div>
              <p className={styles.priceNote}>* 소개로 오시는 분들께 50% 할인</p>
            </div>
          </div>

          <div className={styles.tags}>
            <span>#광주청년예술</span>
            <span>#연극</span>
            <span>#밴드공연</span>
            <span>#댄스공연</span>
            <span>#광주아트홀</span>
          </div>

          <div className={styles.castInfo}>
            <h3>Cast & Crew</h3>
            <p>광주 청년들이 만들어가는 특별한 무대</p>
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
