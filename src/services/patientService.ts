import type { Patient } from '../types/patient';
import { API_BASE_URL } from '../config/constants';
import { FETCH_TIMEOUT_MS } from '../constants';

/**
 * Validates that the data structure matches the Patient type
 * @param data - Data to validate
 * @returns Boolean indicating if data is valid
 */
const isValidPatient = (data: unknown): data is Patient => {
  if (!data || typeof data !== 'object') return false;

  const patient = data as Record<string, unknown>;

  return (
    typeof patient.id === 'string' &&
    typeof patient.name === 'string' &&
    (typeof patient.avatar === 'string' ||
      typeof patient.avatar === 'object') &&
    typeof patient.description === 'string' &&
    typeof patient.website === 'string' &&
    typeof patient.createdAt === 'string'
  );
};

/**
 * Validates that the response is an array of valid patients
 * @param data - Data to validate
 * @returns Boolean indicating if data is valid
 */
const isValidPatientArray = (data: unknown): data is Patient[] => {
  return Array.isArray(data) && data.every(isValidPatient);
};

/**
 * Fetches patients from the API with improved error handling
 * @returns Promise resolving to an array of patients
 * @throws Error with descriptive message for various failure scenarios
 */
export const fetchPatients = async (): Promise<Patient[]> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(API_BASE_URL, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch patients: ${response.status} ${response.statusText}`
      );
    }

    let data: unknown;
    try {
      data = await response.json();
    } catch (jsonError) {
      throw new Error(
        'Failed to parse response: Invalid JSON received from server'
      );
    }

    if (!isValidPatientArray(data)) {
      throw new Error(
        'Invalid data format: Response does not match expected Patient structure'
      );
    }

    return data;
  } catch (error) {
    clearTimeout(timeoutId);

    // Handle abort (timeout) - DOMException or Error with name 'AbortError'
    if (
      (error instanceof Error || error instanceof DOMException) &&
      error.name === 'AbortError'
    ) {
      throw new Error(
        `Request timeout: Failed to fetch patients within ${FETCH_TIMEOUT_MS}ms`
      );
    }

    if (error instanceof Error) {
      // Handle network errors
      if (error.message.includes('fetch')) {
        throw new Error(
          'Network error: Unable to connect to the server. Please check your internet connection.'
        );
      }

      // Re-throw known errors
      throw error;
    }

    // Handle unknown errors
    throw new Error('An unexpected error occurred while fetching patients');
  }
};
