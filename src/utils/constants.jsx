export const BASE_API = "http://192.168.1.201:8000";
export const TYPE_TOKEN = "Bearer";
export const REGEX_PATTERNS = {
  price: /^(0|[1-9][0-9]{0,4})(\.\d{1,2}){1,1}$/,
  payment: /^(0|[1-9][0-9]{0,14})(\.\d{1,2}){1,1}$/,
  stock: /^(0|[1-9][0-9]{0,3})/,
  capacity: /^(0|[1-9][0-9]{0,3})/,
  ci: /^(0|[1-9][0-9]{0,13})/,
  month: /^(0|[1-9][0-9]{0,1})/,
};
