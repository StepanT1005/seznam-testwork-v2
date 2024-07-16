import React from "react";
import styles from "./text-area-field.module.css";
import { FormInputs } from "../../forms/contact-form/contact-form";

type TextAreaFieldProps = {
  name: keyof FormInputs;
  label: string;
  value?: string;
  onChange: (name: keyof FormInputs, value: string) => void;
  error?: string;
  required?: boolean;
};

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  name,
  label,
  value,
  onChange,
  error,
  required = false,
}) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name}>{label}:</label>
      <textarea
        id={name}
        value={value || ""}
        onChange={(e) => onChange(name, e.target.value)}
        aria-invalid={error ? "true" : "false"}
        required={required}
      ></textarea>
      {error && (
        <span className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default TextAreaField;
