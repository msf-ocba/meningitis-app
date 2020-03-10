import React, { useState, useRef } from 'react'

export const Parent = ({ parent }) => {
    return (
        <div>
            <li> Parent: {parent.id} </li>
        </div>
    )
}