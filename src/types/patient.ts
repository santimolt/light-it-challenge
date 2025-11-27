export type Patient = {
  /** Unique identifier for the patient */
  id: string;
  /** Full name of the patient */
  name: string;
  /** URL to the patient's avatar image */
  avatar: string | object;
  /** Detailed description or notes about the patient */
  description: string;
  /** Personal or professional website URL */
  website: string;
  /** ISO date string representing when the patient was created */
  createdAt: string;
};
