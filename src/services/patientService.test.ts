import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchPatients } from './patientService';
import { mockPatients } from '../test/mockData';

// Mock fetch globally
global.fetch = vi.fn();

describe('fetchPatients', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should fetch and return patients successfully', async () => {
    const mockResponse = {
      ok: true,
      json: async () => mockPatients,
    } as Response;

    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    const result = await fetchPatients();

    expect(result).toEqual(mockPatients);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should throw error when response is not ok', async () => {
    const mockResponse = {
      ok: false,
      status: 404,
      statusText: 'Not Found',
      message: 'Not Found',
    } as unknown as Response;

    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    await expect(fetchPatients()).rejects.toThrow(
      'Network error: Unable to connect to the server. Please check your internet connection.'
    );
  });

  it('should throw error for network failures', async () => {
    global.fetch = vi
      .fn()
      .mockRejectedValue(new Error('fetch failed'));

    await expect(fetchPatients()).rejects.toThrow(
      'Network error: Unable to connect to the server'
    );
  });

  it('should throw error when response is invalid JSON', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      statusText: 'OK',
      json: async () => {
        throw new Error('Invalid JSON');
      },
    } as unknown as Response;

    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    await expect(fetchPatients()).rejects.toThrow(
      'Failed to parse response: Invalid JSON received from server'
    );
  });

  it('should throw error when data format is invalid', async () => {
    const invalidData = [
      {
        id: '1',
        name: 'John',
        // Missing required fields
      },
    ];

    const mockResponse = {
      ok: true,
      json: async () => invalidData,
    } as Response;

    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    await expect(fetchPatients()).rejects.toThrow(
      'Invalid data format: Response does not match expected Patient structure'
    );
  });

  it('should throw timeout error when request takes too long', async () => {
    // Use fake timers to control setTimeout
    vi.useFakeTimers();

    // Create a variable to hold the reject function
    let fetchReject: ((reason?: unknown) => void) | undefined;

    // Mock fetch to return a promise that never resolves (simulating slow network)
    global.fetch = vi.fn().mockImplementation(() => {
      return new Promise<Response>((_, reject) => {
        fetchReject = reject;
        // Promise never resolves naturally
      });
    });

    // Start the fetch (this will set up the timeout)
    const fetchPromise = fetchPatients();

    // Fast-forward time to trigger the timeout
    vi.advanceTimersByTime(10000); // FETCH_TIMEOUT_MS

    // Manually reject with AbortError to simulate what fetch does when signal is aborted
    // This happens after the timeout triggers controller.abort()
    if (fetchReject) {
      const abortError = new DOMException('The operation was aborted', 'AbortError');
      fetchReject(abortError);
    }

    // The fetch should reject with AbortError, which gets converted to timeout error
    // We use await here to ensure the promise rejection is caught by the test
    await expect(fetchPromise).rejects.toThrow('Request timeout');

    // Restore real timers
    vi.useRealTimers();
  });

  it('should validate patient data structure correctly', async () => {
    const validData = mockPatients;
    const mockResponse = {
      ok: true,
      json: async () => validData,
    } as Response;

    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    const result = await fetchPatients();
    expect(result).toEqual(validData);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    result.forEach((patient) => {
      expect(patient).toHaveProperty('id');
      expect(patient).toHaveProperty('name');
      expect(patient).toHaveProperty('description');
      expect(patient).toHaveProperty('website');
      expect(patient).toHaveProperty('createdAt');
    });
  });
});

