import React, { useState, useEffect } from 'react'
import { useDataMutation } from '@dhis2/app-runtime'

/**

**/


export const DeleteOrigin = ({ id }) => {

	const mutation = {
        resource: 'events',
        type: 'delete',
        id: ({ id }) => id,
    }   
    const [mutate] = useDataMutation(mutation, {
        variables: { 
            id: id,
        },
    })

    useEffect(() => {
        mutate()
        console.log("Event " + id + " deleted!!")
    },[])

    return (
        <>
        </>
    )
}

export default DeleteOrigin