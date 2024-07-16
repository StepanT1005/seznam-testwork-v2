import React from "react";
import styles from "./input-field.module.css";
import { FormInputs } from "../../forms/contact-form/contact-form";

type InputFieldProps = {
  name: keyof FormInputs;
  label: string;
  type?: string;
  value?: string | null;
  onChange: (name: keyof FormInputs, value: string | null) => void;
  error?: string;
};
const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type = "text",
  value,
  onChange,
  error,
}) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name}>{label}:</label>
      <input
        id={name}
        type={type}
        value={value || ""}
        onChange={(e) => onChange(name, e.target.value)}
        aria-invalid={error ? "true" : "false"}
      />
      {error && (
        <span className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;
