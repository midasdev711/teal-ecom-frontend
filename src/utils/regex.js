export const emailValidation = email => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email.toLowerCase());
}

export const PasswordValidation = password => (
    password.length > 7

)
export const DateOfBirth = bod => {
    const regex = /^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})$/;
    return regex.test(bod);
}
export const replaceSpaceWithUnderscore = name => {
    return lowerCase(name.split(' ').join('_'));
}
export const replaceUnderscoreWithSpace = name => {
    return lowerCase(name.split('_').join(' '));
}
export const confirmPassword = (conformPassword, password) => conformPassword === password

export const stringValue = val => {
    const regex = /^[A-Za-z\-_]+$/;
    return regex.test(val);
}

export const values = object => object ? Object.values(object) : []

export const keys = object => object ? Object.keys(object) : []

export const isEmpty = value => value !== undefined ? value : ''

export const isEmptyString = value => value === ""

export const lowerCase = values => values.toLowerCase()

export const number = val => {
    const regex = /^[0-9]+$/;
    return regex.test(val);
}
export const PhoneNumber = val => {
    const regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return regex.test(val);
}
export const PLZNumber = val => {
    const regex = /^(\+\d{1,3}[- ]?)?\d{4}$/;
    return regex.test(val);
}

export const FisrtCharUpperCase = val => {
    if(val){
        return `${val[0].toUpperCase()}${val.slice(1)}`
    }else{
        return ""
    }
}
export const nullArray = val => {
    console.log('val', val)
    if(val.length > 0){
        return false
    }else{
        return true
    }
}