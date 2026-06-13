import styles from "../styles/WorkshopPage.module.css";

const faqs = [
  {
    question: "Does my child need prior coding experience?",
    answer: "No. The sessions start with beginner-friendly activities and progress into guided building challenges."
  },
  {
    question: "What should students bring?",
    answer: "A notebook and curiosity are enough. Robotics kits and classroom materials are provided during sessions."
  },
  {
    question: "Will parents receive progress updates?",
    answer: "Yes. Mentors share milestone updates and a final project summary after the workshop."
  }
];

export function FAQ() {
  return (
    <section className={styles.section} aria-labelledby="faq-heading">
      <div className={styles.sectionHeader}>
        <p className={styles.eyebrow}>FAQ</p>
        <h2 id="faq-heading">Good things to know</h2>
      </div>
      <div className={styles.faqList}>
        {faqs.map((faq) => (
          <details className={styles.faqItem} key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
