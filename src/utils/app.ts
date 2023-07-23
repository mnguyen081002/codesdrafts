function extractTextFromLastHTMLTag(htmlString: string): string {
  // Tạo một DOMParser để phân tích cú pháp chuỗi HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  // Lấy danh sách tất cả các thẻ HTML con
  const elements = doc.querySelectorAll('*');

  // Kiểm tra xem có thẻ HTML con không
  if (elements.length === 0) {
    return '';
  }

  // Lấy nội dung bên trong thẻ cuối cùng
  const lastElement = elements[elements.length - 1]!;
  const { textContent } = lastElement;

  // Trả về nội dung bên trong thẻ cuối cùng
  return textContent || '';
}

export { extractTextFromLastHTMLTag };
