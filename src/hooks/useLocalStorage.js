import { useEffect, useState } from "react";
import { loadValue, saveValue } from "../utils/storage";

/**
 * Behaves like useState, but reads its initial value from localStorage
 * and writes every update back to it.
 */
export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => loadValue(key, defaultValue));

  useEffect(() => {
    saveValue(key, value);
  }, [key, value]);

  return [value, setValue];
}
