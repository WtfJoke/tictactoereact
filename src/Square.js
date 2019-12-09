import React from 'react'

export const Square = ({ onClick, value }) => {
    return (
        <button className="square" onClick={onClick}>
            {value}
        </button>
    )
}
