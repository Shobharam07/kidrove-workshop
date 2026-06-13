export interface RegistrationFormData {
  name: string;
  email: string;
  phone: string;
}

export interface RegistrationPayload extends RegistrationFormData {
  workshopId: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  form?: string;
}
