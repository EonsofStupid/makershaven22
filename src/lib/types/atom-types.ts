import { atom } from 'jotai';

type AtomPairConfig<T> = {
  default: T;
  onSet?: (value: T) => void;
};

export function createAtomPair<T>(config: AtomPairConfig<T>) {
  const baseAtom = atom<T>(config.default);
  
  const writableAtom = atom(
    (get) => get(baseAtom),
    (_get, set, update: T) => {
      set(baseAtom, update);
      config.onSet?.(update);
    }
  );

  return [baseAtom, writableAtom] as const;
}