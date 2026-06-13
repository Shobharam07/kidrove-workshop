import styles from "../styles/WorkshopPage.module.css";

const outcomes = [
  "Build and test simple robot prototypes",
  "Understand sensors, motors, and control logic",
  "Explore beginner-friendly AI concepts through games",
  "Practice block-based and introductory text coding",
  "Work in teams to solve design challenges",
  "Present a final mini project with confidence"
];

const details = [
  { label: "Age group", value: "8-14 years" },
  { label: "Duration", value: "4 weeks" },
  { label: "Mode", value: "Offline + live mentor support" },
  { label: "Fee", value: "₹2,999" },
  { label: "Start date", value: "15 Jul, 2026" }
];

export function Details() {
  return (
    <section className={styles.section} aria-labelledby="details-heading">
      <div className={styles.sectionHeader}>
        <p className={styles.eyebrow}>Workshop Details</p>
        <h2 id="details-heading">Designed for curious builders</h2>
      </div>
      <div className={styles.detailsGrid}>
        <div className={styles.detailCards} aria-label="Workshop facts">
          {details.map((detail) => (
            <article className={styles.detailCard} key={detail.label}>
              <span>{detail.label}</span>
              <strong>{detail.value}</strong>
            </article>
          ))}
        </div>
        <div className={styles.outcomes}>
          <h3>Learning Outcomes</h3>
          <ul>
            {outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
