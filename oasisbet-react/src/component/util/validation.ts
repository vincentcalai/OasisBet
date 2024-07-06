export function isNotEmpty(value){
    return value.trim() !== '';
}

export function isLongerThanMaxLength(value, maxLength){
    return value.length > maxLength;
}

export function isShorterThanMinLength(value, minLength){
    return value.length < minLength;
}

export function isEqualToOtherValue(value, otherValue){
    return value === otherValue;
}

export function isOnlyContainsAlphaNumeric(value){
    return /^[a-zA-Z]+$/.test(value);
}

export function isOnlyContainsNumeric(value){
    return /^\d+$/.test(value);
}

export function isValidEmail(value){
    return /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
}

export function validateUsername(username: string): string {
    if (!isNotEmpty(username)) {
      return 'This field is required';
    } else if (!isOnlyContainsAlphaNumeric(username)) {
      return 'Please enter only alphabet characters';
    } else if (isLongerThanMaxLength(username, 20)) {
      return 'Maximum length is 20 characters';
    } else if (isShorterThanMinLength(username, 5)) {
      return 'Minimum length is 5 characters';
    } else {
      return '';
    }
}

export function validatePassword(password: string): string {
    if (!isNotEmpty(password)) {
      return 'This field is required';
    } else if (isLongerThanMaxLength(password, 20)) {
      return 'Maximum length is 20 characters';
    } else if (isShorterThanMinLength(password, 5)) {
      return 'Minimum length is 5 characters';
    } else {
      return '';
    }
}
  
export function validateCfmPassword(cfmPassword: string, password: string): string {
    if (!isNotEmpty(cfmPassword)) {
      return 'This field is required';
    } else if (!isEqualToOtherValue(cfmPassword, password)) {
      return 'Passwords do not match';
    } else {
      return '';
    }
}

export function validateEmail(email: string): string {
    if (!isNotEmpty(email)) {
      return 'This field is required';
    } else if (!isValidEmail(email)) {
      return 'Please enter a valid email address';
    } else if (isLongerThanMaxLength(email, 100)) {
      return 'Maximum length is 100 characters';
    } else {
      return '';
    }
}

export function validateContactNo(contactNo: string): string {
    if (!isNotEmpty(contactNo)) {
      return 'This field is required';
    } else if (!isOnlyContainsNumeric(contactNo)) {
      return 'Please enter only numeric characters';
    } else if (isLongerThanMaxLength(contactNo, 30)) {
      return 'Maximum length is 30 characters';
    } else {
      return '';
    }
}