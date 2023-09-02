export const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const mobilePattern = /^(\+98|0)?9\d{9}$/;
export const nationalCodePattern = /^[0-9]{10}$/g;
export const urlPattern = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;
export const shabaPattern = /^(?:IR)(?=.{24}$)[0-9]*$/;

/** 
 ^	The password string will start this way
(?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
(?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
(?=.*[0-9])	The string must contain at least 1 numeric character
(?=.*[!@#$%^&*])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
(?=.{8,})	The string must be eight characters or longer
 */
export const strongRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})",
);
