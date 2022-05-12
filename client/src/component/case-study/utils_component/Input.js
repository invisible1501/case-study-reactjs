import React from "react";

export default function Input(props) {
    const { type, name, value, onChange, onBlur, placeholder, disable } = props;

    return(
        <input 
            type={type}
            name={name && name}
            value={value}
            onChange={onChange && onChange}
            onBlur={onBlur && onBlur}
            placeholder={placeholder && placeholder}
            disabled={disable && disable}
        />
    )
}