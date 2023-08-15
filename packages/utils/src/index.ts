const STORAGE_PREFIX = '_';
export function localStorage(key: string, value?: any): any {
  if (value !== undefined) {
    window.localStorage.setItem(STORAGE_PREFIX + key, value);
    return;
  }
  return window.localStorage.getItem(STORAGE_PREFIX + key);
}

// 判断字节长度
export const byteLength = (str: string): number => {
  // return str.replace(/[^\u0000-\u00ff]/g, 'aa').length;
  let templen = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 255) {
      templen += 2;
    } else {
      templen++;
    }
  }
  return templen;
};

// 限制字符串输入长度 字节
export const JudgmentBytes = (msg: string, num: number): any => {
  if (msg && byteLength(msg) > num) {
    return false;
  }
  return msg;
};

// 截取字符串多少个字符：suffix:后缀
export const substringLength = (str: string, len = 12, suffix = '...') => {
  if (!str) return '';
  if (len <= 0) return '';
  // eslint-disable-next-line no-param-reassign
  if (!suffix) suffix = '';
  let templen = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 255) {
      templen += 2;
    } else {
      templen++;
    }

    if (templen > len) {
      return str.substring(0, i) + suffix;
    }
  }
  return str;
};

// 判断url
export function isUrl(str: string): boolean {
  const v =
    /^(?!mailto:)(?:(?:http|https|ftp):\/\/|\/\/)(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:(\/|\?|#)[^\s]*)?$/i;
  return v.test(str);
}

// 判断资源类型
export function getFileType(name: string): any {
  if (!name) return false;
  const index1 = name.lastIndexOf('.');
  const index2 = name.length;
  const postf = name.substring(index1, index2).toLowerCase();
  const imgType = ['.gif', '.jpeg', '.jpg', '.bmp', '.png']; // ['.pic', '.svg'];
  const videoType = [
    '.avi',
    '.wmv',
    '.mkv',
    '.mp4',
    '.mov',
    '.rm',
    '.3gp',
    '.flv',
    '.mpg',
    '.rmvb',
  ];
  if (imgType.includes(postf)) {
    return 'image';
  } else if (videoType.includes(postf)) {
    return 'video';
  } else {
    return false;
  }
}
