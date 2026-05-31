import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTheme } from '../hooks/useTheme';

describe('useTheme', () => {
  beforeEach(() => localStorage.clear());

  it('defaults to dark when localStorage is empty', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark');
  });

  it('reads initial theme from localStorage', () => {
    localStorage.setItem('hvd-theme', 'light');
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');
  });

  it('toggles from dark to light', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('dark');
    act(() => result.current.toggle());
    expect(result.current.theme).toBe('light');
  });

  it('toggles from light back to dark', () => {
    localStorage.setItem('hvd-theme', 'light');
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggle());
    expect(result.current.theme).toBe('dark');
  });

  it('persists theme to localStorage on toggle', () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggle());
    expect(localStorage.getItem('hvd-theme')).toBe('light');
  });

  it('sets data-theme attribute on documentElement', () => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggle());
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });
});
