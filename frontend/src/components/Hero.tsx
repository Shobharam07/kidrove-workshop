import styles from "../styles/WorkshopPage.module.css";

interface HeroProps {
  onEnrollClick: () => void;
}

export function Hero({ onEnrollClick }: HeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="workshop-title">
      <div className={styles.heroContent}>
        <p className={styles.eyebrow}>Kidrove Summer Lab</p>
        <h1 id="workshop-title">AI & Robotics Summer Workshop</h1>
        <p className={styles.heroText}>
          A hands-on, mentor-led workshop where kids aged 8-14 build smart robots,
          explore beginner AI, and turn curious ideas into working projects.
        </p>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={onEnrollClick}
          aria-label="Enroll now and jump to the registration form"
        >
          Enroll Now
        </button>
      </div>
      <div className={styles.heroMedia} aria-hidden="true">
        <img src="/assets/workshop-hero.png" alt="" />
      </div>
    </section>
  );
}
