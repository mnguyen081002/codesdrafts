import imageExtensions from 'image-extensions';
import isUrl from 'is-url';
import { toast, Zoom } from 'react-toastify';

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

export async function toastPromise<T>(
  api: Promise<T>,
  { pending = 'Đang xử lý', success = 'Thành công', error = 'Thất bại' },
) {
  return toast.promise(
    api,
    {
      pending,
      success,
      error,
    },
    {
      autoClose: 500,
      hideProgressBar: true,
      transition: Zoom,
    },
  );
}

export function postFormatDate(date?: string): string {
  // Define options for formatting

  const toDate = new Date(date || new Date());

  // Format the date
  const formattedDate = new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(toDate);

  return formattedDate;
}

const isImageUrl = (url) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split('.').pop();
  if (!ext) return false;
  return imageExtensions.includes(ext);
};

function capitalizeFirstLetter(inputString: string): string {
  if (inputString.length === 0) {
    return inputString; // Handle empty string if needed
  }

  let firstChar = '';
  if (inputString[0]) {
    firstChar = inputString[0].toUpperCase();
  }
  const restOfString = inputString.slice(1);

  return firstChar + restOfString;
}

function lowerCaseFirstLetter(inputString: string): string {
  if (inputString.length === 0) {
    return inputString; // Handle empty string if needed
  }

  let firstChar = '';
  if (inputString[0]) {
    firstChar = inputString[0].toLowerCase();
  }
  const restOfString = inputString.slice(1);

  return firstChar + restOfString;
}

export {
  capitalizeFirstLetter,
  extractTextFromLastHTMLTag,
  formatCoursePrice,
  formatTimeCountDown,
  isImageUrl,
  lowerCaseFirstLetter,
  toastGetErrorMessage,
};
