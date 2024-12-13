import { useState, useCallback } from 'react';
import { HistoryManager, CustomizationState } from '../types';

const MAX_HISTORY_LENGTH = 50;

export const useHistoryManager = (initialState: CustomizationState) => {
  const [history, setHistory] = useState<HistoryManager>({
    past: [],
    present: initialState,
    future: [],
  });

  const pushState = useCallback((newState: CustomizationState) => {
    setHistory(curr => ({
      past: [...curr.past, curr.present].slice(-MAX_HISTORY_LENGTH),
      present: newState,
      future: [],
    }));
  }, []);

  const undo = useCallback(() => {
    setHistory(curr => {
      if (curr.past.length === 0) return curr;

      const previous = curr.past[curr.past.length - 1];
      const newPast = curr.past.slice(0, -1);

      return {
        past: newPast,
        present: previous,
        future: [curr.present, ...curr.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setHistory(curr => {
      if (curr.future.length === 0) return curr;

      const next = curr.future[0];
      const newFuture = curr.future.slice(1);

      return {
        past: [...curr.past, curr.present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  const reset = useCallback((initialState: CustomizationState) => {
    setHistory({
      past: [],
      present: initialState,
      future: [],
    });
  }, []);

  return {
    state: history.present,
    pushState,
    undo,
    redo,
    reset,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
  };
};