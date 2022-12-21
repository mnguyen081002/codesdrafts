import {customAlphabet} from "nanoid";

export function generateId(
  size: number,
  options: { constraint?: number } = { constraint: 0 },
): number {
  const alphabet = "0123456789";
  const nano = customAlphabet(alphabet, size);
  if (!options.constraint) {
    return parseInt(nano());
  }
  return options.constraint + parseInt(nano());
}
