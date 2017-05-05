import React from 'react';

export const Button = ({text, onClick}) => <button className="ts-button" onClick={onClick} >{text}</button>;

export default Button;