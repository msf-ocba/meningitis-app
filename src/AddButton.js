import React from 'react'
import { useDataMutation } from '@dhis2/app-runtime'


const AddButton = ({ onCreate }) => {
    const [mutate] = useDataMutation(mutation, {
        onComplete: onCreate,
        variables: {
            orgUnit: 'Pyt3nwQOO6a',
        },
    })

    return (
        <button
            onClick={() => {
                mutate()
            }}
            style={{ margin: 10 }}
        >
            Add Origin Events
        </button>
    )
}

export default AddButton