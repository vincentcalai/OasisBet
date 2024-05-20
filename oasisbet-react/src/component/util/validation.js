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