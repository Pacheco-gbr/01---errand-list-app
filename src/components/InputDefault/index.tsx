import { TextField } from '@mui/material';
import React from 'react';

interface InputDefaultProps {
  typeToSend: string;
  nameToSend: Name;
  labelToSend: string;
  valueToSend: string;
  colorThatShows: 'error' | 'success';
  handleChange: (value: string, key: Name) => void;
}

export type Name = 'name' | 'email' | 'password' | 'repassword' | 'description' | 'detail'

function InputDefault({typeToSend, nameToSend, labelToSend, valueToSend, colorThatShows, handleChange}: InputDefaultProps) {
  return(
    <TextField color={colorThatShows} name={nameToSend} label={labelToSend} variant="outlined" type={typeToSend} value={valueToSend} onChange={(ev) => handleChange(ev.target.value, nameToSend)}/>
  )
}

export { InputDefault }