import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should return initial value when no stored value exists', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    
    expect(result.current[0]).toBe('initial');
  });

  it('should return stored value if it exists', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'));
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    
    expect(result.current[0]).toBe('stored-value');
  });

  it('should update localStorage when value is set', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    
    act(() => {
      result.current[1]('new-value');
    });
    
    expect(result.current[0]).toBe('new-value');
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('new-value'));
  });

  it('should handle function updater', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 10));
    
    act(() => {
      result.current[1]((prev) => prev + 5);
    });
    
    expect(result.current[0]).toBe(15);
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify(15));
  });

  it('should handle objects', () => {
    const initialObject = { name: 'test', count: 0 };
    const { result } = renderHook(() => useLocalStorage('test-key', initialObject));
    
    expect(result.current[0]).toEqual(initialObject);
    
    act(() => {
      result.current[1]({ name: 'updated', count: 5 });
    });
    
    expect(result.current[0]).toEqual({ name: 'updated', count: 5 });
  });

  it('should handle arrays', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', [1, 2, 3]));
    
    expect(result.current[0]).toEqual([1, 2, 3]);
    
    act(() => {
      result.current[1]([4, 5, 6]);
    });
    
    expect(result.current[0]).toEqual([4, 5, 6]);
  });

  it('should handle boolean values', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', false));
    
    expect(result.current[0]).toBe(false);
    
    act(() => {
      result.current[1](true);
    });
    
    expect(result.current[0]).toBe(true);
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify(true));
  });

  it('should return initial value on JSON parse error', () => {
    localStorage.setItem('test-key', 'invalid-json{');
    
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'fallback'));
    
    expect(result.current[0]).toBe('fallback');
    expect(consoleSpy).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });

  it('should handle multiple keys independently', () => {
    const { result: result1 } = renderHook(() => useLocalStorage('key1', 'value1'));
    const { result: result2 } = renderHook(() => useLocalStorage('key2', 'value2'));
    
    expect(result1.current[0]).toBe('value1');
    expect(result2.current[0]).toBe('value2');
    
    act(() => {
      result1.current[1]('updated1');
    });
    
    expect(result1.current[0]).toBe('updated1');
    expect(result2.current[0]).toBe('value2');
  });
});
