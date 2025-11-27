import { describe, it, expect } from 'vitest';
import { filterPatients } from './filterPatients';
import { mockPatients } from '../test/mockData';

describe('filterPatients', () => {
  it('should return all patients when search query is empty', () => {
    const result = filterPatients(mockPatients, '');
    expect(result).toEqual(mockPatients);
  });

  it('should return all patients when search query is only whitespace', () => {
    const result = filterPatients(mockPatients, '   ');
    expect(result).toEqual(mockPatients);
  });

  it('should filter patients by name (case insensitive)', () => {
    const result = filterPatients(mockPatients, 'john');
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('John Doe');
    expect(result[1].name).toBe('Bob Johnson');
  });

  it('should filter patients by exact name match', () => {
    const result = filterPatients(mockPatients, 'Jane Smith');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Jane Smith');
  });

  it('should filter patients by partial name match', () => {
    const result = filterPatients(mockPatients, 'Jane');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Jane Smith');
  });

  it('should return empty array when no matches found', () => {
    const result = filterPatients(mockPatients, 'NonExistent');
    expect(result).toEqual([]);
  });

  it('should handle empty patients array', () => {
    const result = filterPatients([], 'john');
    expect(result).toEqual([]);
  });

  it('should be case insensitive', () => {
    const result1 = filterPatients(mockPatients, 'JOHN');
    const result2 = filterPatients(mockPatients, 'john');
    const result3 = filterPatients(mockPatients, 'John');
    expect(result1).toEqual(result2);
    expect(result2).toEqual(result3);
  });
});

