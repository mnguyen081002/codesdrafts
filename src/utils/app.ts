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

function toastGetErrorMessage(data: any) {
  return `${data.response.data.message}`;
}

function formatCoursePrice(price: number, suffix = ' VNĐ') {
  return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} ${suffix}`;
}

// convert time from minutes to hours and minutes
export function convertTime(time: number): string {
  if (!time) {
    return '0 phút';
  }
  if (time < 0) {
    return '0 phút';
  }

  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  let result = '';

  if (hours > 0) {
    result += `${hours}giờ `;
  }

  if (minutes > 0) {
    result += `${minutes} phút`;
  }

  return result.trim();
}

function formatTimeCountDown(countdown: number): string {
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return formattedSeconds === '00' ? `${minutes}:00` : `${minutes}:${formattedSeconds}`;
}

export { extractTextFromLastHTMLTag, formatCoursePrice, formatTimeCountDown, toastGetErrorMessage };
