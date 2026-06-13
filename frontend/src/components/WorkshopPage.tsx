import { useRef } from "react";
import { Details } from "./Details";
import { FAQ } from "./FAQ";
import { Hero } from "./Hero";
import { RegistrationForm } from "./RegistrationForm";
import styles from "../styles/WorkshopPage.module.css";

export function WorkshopPage() {
  const registrationRef = useRef<HTMLElement | null>(null);

  const scrollToRegistration = () => {
    registrationRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className={styles.page}>
      <Hero onEnrollClick={scrollToRegistration} />
      <Details />
      <FAQ />
      <section ref={registrationRef} className={styles.registrationSection} aria-labelledby="registration-heading">
        <RegistrationForm />
      </section>
    </main>
  );
}
