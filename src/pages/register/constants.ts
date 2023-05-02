export function isPasswordStrong(password: string, isTeacher: boolean): boolean {
    if (isTeacher) {
        return password.length >= 10 && !(password.search(/[A-Z]/) === -1 || password.search(/[a-z]/) === -1 || password.search(/[0-9]/) === -1 || password.search(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/) === -1);
    } else {
        return password.length >= 8 && !(password.search(/[A-Z]/) === -1 || password.search(/[a-z]/) === -1 || password.search(/[0-9]/) === -1);
    }
}

export const PASSWORD_STATUS = {
    NO_PWD: { name: 'No password!', colour: '#FF0000' },
    TOO_WEAK: { name: 'Password too weak!', colour: '#DBA901' },
    STRONG: { name: 'Strong password!', colour: '#088A08' },
    TOO_COMMON: { name: 'Password too common!', colour: '#DBA901' }
};

export const MOST_USED_PASSWORDS = ['Abcd1234', 'Password1', 'Qwerty123'];
