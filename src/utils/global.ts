export const getArrayDepth = (value: any[]) =>
  Array.isArray(value) ? 1 + Math.max(0, ...value.map(getArrayDepth)) : 0;

export function utf8ToSlug(input: string): string {
  // Chuyển tất cả các ký tự thành chữ thường
  input = input.toLowerCase();

  // Loại bỏ các ký tự đặc biệt
  input = input.replace(/[^a-z0-9\s]/g, '');

  // Thay thế khoảng trắng bằng gạch ngang
  input = input.replace(/\s+/g, '-');

  return input;
}

export function vietnameseToSlug(input: string): string {
  // Chuyển tất cả các ký tự thành chữ thường
  input = input.toLowerCase();

  // Loại bỏ dấu
  input = input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Loại bỏ các ký tự đặc biệt
  input = input.replace(/[^a-z0-9\s]/g, '');

  // Thay thế khoảng trắng bằng gạch ngang
  input = input.replace(/\s+/g, '-');

  return input;
}
