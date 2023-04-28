import React, { useEffect, useState } from 'react';
import {
    Unstable_Grid2 as Grid,
    Typography,
    TextField,
    InputAdornment
} from '@mui/material';

import SecurityIcon from '@mui/icons-material/Security';
import CircleIcon from '@mui/icons-material/Circle';

function isPasswordStrong(password: string, isTeacher: boolean): boolean {
    if (isTeacher) {
        return password.length >= 10 && !(password.search(/[A-Z]/) === -1 || password.search(/[a-z]/) === -1 || password.search(/[0-9]/) === -1 || password.search(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/) === -1);
    } else {
        return password.length >= 8 && !(password.search(/[A-Z]/) === -1 || password.search(/[a-z]/) === -1 || password.search(/[0-9]/) === -1);
    }
}

const PasswordStatus: React.FC<{
    isTeacher: boolean,
    pwd: string,
    setIsStrongPwd: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ isTeacher, pwd, setIsStrongPwd }) => {
    const pwdStrengths = {
        NoPwd: { name: 'No password!', colour: '#FF0000' },
        TooWeak: { name: 'Password too weak!', colour: '#DBA901' },
        Strong: { name: 'Strong password!', colour: '#088A08' },
        TooCommon: { name: 'Password too common!', colour: '#DBA901' }
    };
    const mostUsedPasswords = ['Abcd1234', 'Password1', 'Qwerty123'];

    const [pwdStatus, setPwdStatus] = useState(pwdStrengths.NoPwd);

    useEffect(() => {
        if (isPasswordStrong(pwd, isTeacher)) {
            setIsStrongPwd(true);
            setPwdStatus(pwdStrengths.Strong);
        } else {
            setIsStrongPwd(false);
            if (pwd === '') {
                setPwdStatus(pwdStrengths.NoPwd);
            } else if (mostUsedPasswords.includes(pwd)) {
                setPwdStatus(pwdStrengths.TooCommon);
            } else {
                setPwdStatus(pwdStrengths.TooWeak);
            }
        }
    }, [pwd]);

    return (
        <>
            <Grid xs={12} className='flex-center'>
                <CircleIcon htmlColor={pwdStatus.colour} stroke='white' strokeWidth={1} />&nbsp;&nbsp;
                <Typography fontSize={18} fontWeight={500} margin={0}>{pwdStatus.name}</Typography>
            </Grid>
        </>
    );
};

export default PasswordStatus;
