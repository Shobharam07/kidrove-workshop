import { FormEvent, useState } from "react";
import type { FormErrors, RegistrationFormData, RegistrationPayload } from "../types";
import styles from "../styles/WorkshopPage.module.css";

const WORKSHOP_ID = "ai-robotics-summer-2026";
const API_BASE_URL = "https://kidrove-workshop-l1sv.onrender.com";

const initialFormData: RegistrationFormData = {
  name: "",
  email: "",
  phone: ""
};

function validateForm(formData: RegistrationFormData): FormErrors {
  const errors: FormErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9+\-\s()]{7,16}$/;

  if (!formData.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!emailPattern.test(formData.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!phonePattern.test(formData.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }

  return errors;
}

export function RegistrationForm() {
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const updateField = (field: keyof RegistrationFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined, form: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload: RegistrationPayload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      workshopId: WORKSHOP_ID
    };

    setStatus("submitting");

    try {
      const response = await fetch(`${API_BASE_URL}/api/enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        setErrors(result.errors ?? { form: result.message ?? "Unable to submit enquiry." });
        setStatus("idle");
        return;
      }

      setStatus("success");
      setFormData(initialFormData);
    } catch {
      setErrors({ form: "Could not reach the server. Please try again soon." });
      setStatus("idle");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.formIntro}>
        <p className={styles.eyebrow}>Register Interest</p>
        <h2 id="registration-heading">Save a seat for your child</h2>
        <p>Share your details and the Kidrove team will contact you with batch availability.</p>
      </div>

      <label className={styles.field}>
        <span>Name</span>
        <input
          value={formData.name}
          onChange={(event) => updateField("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          autoComplete="name"
          required
        />
        {errors.name && <small id="name-error">{errors.name}</small>}
      </label>

      <label className={styles.field}>
        <span>Email</span>
        <input
          type="email"
          value={formData.email}
          onChange={(event) => updateField("email", event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          autoComplete="email"
          required
        />
        {errors.email && <small id="email-error">{errors.email}</small>}
      </label>

      <label className={styles.field}>
        <span>Phone Number</span>
        <input
          type="tel"
          value={formData.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          autoComplete="tel"
          required
        />
        {errors.phone && <small id="phone-error">{errors.phone}</small>}
      </label>

      {errors.form && (
        <p className={styles.formError} role="alert">
          {errors.form}
        </p>
      )}

      {status === "success" && (
        <p className={styles.formSuccess} role="status">
          Thanks. Your enquiry has been received.
        </p>
      )}

      <button className={styles.primaryButton} type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : "Submit Enquiry"}
      </button>
    </form>
  );
}
