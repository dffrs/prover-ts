export const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
export const dateFormatPattern = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
export const alphanumericPattern = /^[a-zA-Z0-9]+$/;
export const numericPattern = /^[0-9]+$/;
export const phoneNumberPattern = /^(?:(?:\+|00)\d{1,3}\s?)?(?:\d{1,4}\s?){1,4}$/;
export const ipv4Pattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
export const zipCodePattern = /^\d{5}(?:[-\s]\d{4})?$/;
