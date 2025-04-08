import Image from 'next/image';
import styles from './page.module.css';
import { promises as fs } from 'fs';
import path from 'path';
import MusicPlayer from './components/MusicPlayer';
import ScrollButton from './components/ScrollButton';

export default async function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroTitleWrapper}>
            <h1 className={styles.title}>
              <span className={styles.titleLine}>넷플릭스 화제의 드라마</span>
              <span className={styles.titleHighlight}>"폭싹 속았수다"</span>
              <span className={styles.titleLine}>광주 ver. <span className={styles.titleEmoji}>😎</span></span>
            </h1>
            <div className={styles.heroButtonWrapper}>
              <ScrollButton targetId="posterSection" />
            </div>
          </div>
        </div>
      </div>

      <section className={styles.container}>
        <div className={styles.musicPlayerWrapper}>
          <MusicPlayer />
        </div>
        
        <div className={styles.imageWrapper} id="posterSection">
          <div className={styles.imageDecoration}></div>
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
          <div className={styles.imageCaption}>
            <span className={styles.imageCaptionIcon}>★</span>
            <span className={styles.imageCaptionText}>2000년대 추억 속으로 떠나는 시간여행</span>
            <span className={styles.imageCaptionIcon}>★</span>
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.commentSection}>
            <div className={styles.commentHeader}>
              <span className={styles.commentHeaderLine}></span>
              <h2 className={styles.commentHeaderText}>COMMENT</h2>
              <span className={styles.commentHeaderLine}></span>
            </div>
            
            <div className={styles.quoteWrapper}>
              <p className={styles.comment}><span className={styles.quoteIcon}>"</span>동(童)심으로 돌아가서 현재를 동(動)심하라<span className={styles.quoteIcon}>"</span></p>
            </div>
            
            <div className={styles.commentSubWrapper}>
              <p className={styles.commentSub}>BACK TO THE 2000's</p>
            </div>
            
            <div className={styles.descriptionCard}>
              <p className={styles.description}>
                <span className={styles.questionHighlight}>기억나세요?</span> 그 시절 우리가 함께했던 추억들...<br/>
                20~30대라면 누구나 심장이 두근거릴 체험형 전시회가 찾아옵니다!
              </p>
              <p className={styles.description}>
                졸업한지 10년이 지났지만, 친구들과 놀이터를 뛰어놀던 그 순간으로<br/>
                다시 돌아갈 준비, 되셨나요<span className={styles.questionMark}>?</span>
              </p>
            </div>
          </div>

          <div className={styles.detailsSection}>
            <div className={styles.detailsHeader}>
              <span className={styles.detailsHeaderLine}></span>
              <h2 className={styles.detailsHeaderText}>DETAILS</h2>
              <span className={styles.detailsHeaderLine}></span>
            </div>
            
            <div className={styles.zoneInfo}>
              <div className={styles.zoneCard}>
                <div className={styles.zoneCardHeader}>
                  <h3 className={styles.zoneTitle}>PAST ZONE</h3>
                  <div className={styles.zoneTitleLine}></div>
                </div>
                <p className={styles.zoneDescription}>추억의 그시절로</p>
                <div className={styles.zoneImageWrapper}>
                  <Image
                    src="/img/PAST ZONE.png"
                    alt="PAST ZONE 이미지"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                    className={styles.zoneImage}
                    draggable="false"
                  />
                </div>
              </div>
              
              <div className={styles.zoneCard}>
                <div className={styles.zoneCardHeader}>
                  <h3 className={styles.zoneTitle}>PRESENT ZONE</h3>
                  <div className={styles.zoneTitleLine}></div>
                </div>
                <p className={styles.zoneDescription}>내 안의 "인사이드 아웃"</p>
                <div className={styles.zoneImageWrapper}>
                  <Image
                    src="/img/PRESENT ZONE.jpg"
                    alt="PRESENT ZONE 이미지"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                    className={styles.zoneImage}
                    draggable="false"
                  />
                </div>
              </div>
              
              <div className={styles.zoneCard}>
                <div className={styles.zoneCardHeader}>
                  <h3 className={styles.zoneTitle}>FUTURE ZONE</h3>
                  <div className={styles.zoneTitleLine}></div>
                </div>
                <p className={styles.zoneDescription}>느린 우체국</p>
                <div className={styles.zoneImageWrapper}>
                  <Image
                    src="/img/FUTURE ZONE.jpg"
                    alt="FUTURE ZONE 이미지"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                    className={styles.zoneImage}
                    draggable="false"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.eventInfoSection}>
            <div className={styles.eventHeader}>
              <span className={styles.eventHeaderLine}></span>
              <h2 className={styles.eventHeaderText}>EVENT INFO</h2>
              <span className={styles.eventHeaderLine}></span>
            </div>
            
            <div className={styles.eventDetailsCard}>
              <div className={styles.eventDetailsContent}>
                <div className={styles.eventItem}>
                  <div className={styles.eventIcon}>🚩</div>
                  <div className={styles.eventText}>
                    <p className={styles.eventTitle}>장소</p>
                    <p className={styles.eventValue}>광주 청년 공간 "하다"</p>
                    <p className={styles.address}>(동구 대의동 6-1, 2,3층)</p>
                  </div>
                </div>
                
                <div className={styles.eventItem}>
                  <div className={styles.eventIcon}>📅</div>
                  <div className={styles.eventText}>
                    <p className={styles.eventTitle}>일시</p>
                    <p className={styles.eventValue}>25.4.11~12 (PM 5-9시)</p>
                  </div>
                </div>
                
                <div className={styles.eventItem}>
                  <div className={styles.eventIcon}>✨</div>
                  <div className={styles.eventText}>
                    <p className={styles.eventTitle}>혜택</p>
                    <p className={styles.eventValue}>인스타 팔로우하고 행사 포스터 제시 시 3,000원으로 할인!</p>
                    <p className={styles.eventValue}>모든 방문객분들께 굿즈 증정!</p>
                  </div>
                </div>
                
                <div className={styles.eventItem}>
                  <div className={styles.eventIcon}>ℹ️</div>
                  <div className={styles.eventText}>
                    <p className={styles.eventValue}>한번에 많은 사람이 몰릴 수 있으니, 참고 부탁드립니다 : )</p>
                  </div>
                </div>
                
                <div className={styles.eventItem}>
                  <div className={styles.eventIcon}>🎆</div>
                  <div className={styles.eventText}>
                    <p className={styles.eventTitle}>주최</p>
                    <p className={styles.eventValue}>청춘미담</p>
                  </div>
                </div>
              </div>
              
              <div className={styles.socialLinksWrapper}>
                <a href="https://www.instagram.com/youth_midam" target="_blank" rel="noopener noreferrer" className={styles.instagramLink}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={styles.instagramIcon}>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span className={styles.instagramHandle}>@youth_midam</span>
                </a>
              </div>
            </div>
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
