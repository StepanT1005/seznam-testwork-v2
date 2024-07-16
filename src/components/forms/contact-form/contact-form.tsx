import React, { useState } from "react";
import InputField from "../../common/input-field/input-field";
import TextAreaField from "../../common/text-area-field/text-area-field";
import styles from "./contact-form.module.css";

export type FormInputs = {
  name?: string;
  email?: string | null;
  phone?: string | null;
  message: string;
};

const validateEmail = (email: string | null) => {
  return String(email)
    .toLowerCase()
    .match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
};

const validatePhone = (phone: string | null) => {
  return phone && /^\+?[0-9]{10,14}$/.test(phone);
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormInputs>({ message: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<string | null>(null);

  const handleChange = (field: keyof FormInputs, value: string | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.message) newErrors.message = "Message is required";
    if (!formData.email && !formData.phone) {
      newErrors.email = "Either email or phone is required";
      newErrors.phone = "Either email or phone is required";
    } else {
      if (formData.email && !validateEmail(formData.email))
        newErrors.email = "Invalid email address";
      if (formData.phone && !validatePhone(formData.phone))
        newErrors.phone = "Invalid phone number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          if (formData.email === "neexistujici@email.cz") {
            reject(new Error("Neexistující emailová adresa"));
          } else {
            resolve();
          }
        }, 3000);
      });
      setSubmitResult("Form submitted successfully");
      setFormData({ message: "" });
    } catch (error) {
      if (error instanceof Error) {
        setSubmitResult(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} aria-live="assertive">
      <InputField
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
      />
      <InputField
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />
      <InputField
        name="phone"
        label="Phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
      />
      <TextAreaField
        name="message"
        label="Message"
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
        required
      />
      {errors.root && <div className={styles.error}>{errors.root}</div>}
      <button
        type="submit"
        disabled={isSubmitting}
        className={styles.submitButton}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      {submitResult && (
        <div className={styles.submitResult}>{submitResult}</div>
      )}
    </form>
  );
};

export default ContactForm;
