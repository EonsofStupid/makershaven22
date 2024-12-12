import { WritableAtom, Atom } from 'jotai';

export type SetStateAction<Value> = Value | ((prev: Value) => Value);

export type AtomSetter<Value> = WritableAtom<
  Value,
  [SetStateAction<Value>],
  void
>;

export type AtomGetter<Value> = Atom<Value>;

export type WritableAtomConfig<Value> = {
  default: Value;
  onSet?: (newValue: Value, oldValue: Value) => void;
};

export function createAtomPair<Value>(config: WritableAtomConfig<Value>) {
  const baseAtom = atom(config.default);
  const writableAtom = atom(
    (get) => get(baseAtom),
    (get, set, update: SetStateAction<Value>) => {
      const prevValue = get(baseAtom);
      const nextValue = typeof update === 'function' 
        ? (update as (prev: Value) => Value)(prevValue)
        : update;
      
      set(baseAtom, nextValue);
      config.onSet?.(nextValue, prevValue);
    }
  );

  return [baseAtom, writableAtom] as const;
}