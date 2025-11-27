import { describe, it, expect } from 'vitest';
import { distributePatients } from './patientDistribution';
import type { Patient } from '../types/patient';

const createMockPatient = (id: string, name: string): Patient => ({
  id,
  name,
  avatar: '',
  description: '',
  website: '',
  createdAt: new Date().toISOString(),
});

describe('distributePatients', () => {
  it('should distribute patients evenly across columns', () => {
    const patients = [
      createMockPatient('1', 'Patient 1'),
      createMockPatient('2', 'Patient 2'),
      createMockPatient('3', 'Patient 3'),
      createMockPatient('4', 'Patient 4'),
    ];
    const columns = distributePatients(patients, 2);

    expect(columns).toHaveLength(2);
    expect(columns[0]).toHaveLength(2);
    expect(columns[1]).toHaveLength(2);
    expect(columns[0][0].id).toBe('1');
    expect(columns[1][0].id).toBe('2');
    expect(columns[0][1].id).toBe('3');
    expect(columns[1][1].id).toBe('4');
  });

  it('should handle uneven distribution', () => {
    const patients = [
      createMockPatient('1', 'Patient 1'),
      createMockPatient('2', 'Patient 2'),
      createMockPatient('3', 'Patient 3'),
    ];
    const columns = distributePatients(patients, 2);

    expect(columns).toHaveLength(2);
    expect(columns[0]).toHaveLength(2);
    expect(columns[1]).toHaveLength(1);
  });

  it('should handle empty patients array', () => {
    const columns = distributePatients([], 3);
    expect(columns).toHaveLength(3);
    expect(columns.every((col) => col.length === 0)).toBe(true);
  });

  it('should handle single column', () => {
    const patients = [
      createMockPatient('1', 'Patient 1'),
      createMockPatient('2', 'Patient 2'),
    ];
    const columns = distributePatients(patients, 1);

    expect(columns).toHaveLength(1);
    expect(columns[0]).toHaveLength(2);
    expect(columns[0][0].id).toBe('1');
    expect(columns[0][1].id).toBe('2');
  });

  it('should handle more columns than patients', () => {
    const patients = [createMockPatient('1', 'Patient 1')];
    const columns = distributePatients(patients, 3);

    expect(columns).toHaveLength(3);
    expect(columns[0]).toHaveLength(1);
    expect(columns[1]).toHaveLength(0);
    expect(columns[2]).toHaveLength(0);
  });

  it('should preserve patient order in distribution', () => {
    const patients = Array.from({ length: 9 }, (_, i) =>
      createMockPatient(String(i + 1), `Patient ${i + 1}`)
    );
    const columns = distributePatients(patients, 3);

    // Verify order is preserved (round-robin distribution)
    expect(columns[0][0].id).toBe('1');
    expect(columns[1][0].id).toBe('2');
    expect(columns[2][0].id).toBe('3');
    expect(columns[0][1].id).toBe('4');
  });
});

