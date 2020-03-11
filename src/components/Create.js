import React, { useState, useRef } from 'react'
import { useDataMutation } from '@dhis2/app-runtime'

const mutation = {
    resource: 'events',
    type: 'create',
    data: ({ orgUnit, trackedEntityInstance, enrollment, eventDate }) => ({
        program: 'VOEVJzwp4F7',
        programStage: 'UFGwxeTgzZD',
        orgUnit,
        trackedEntityInstance,
        enrollment,
        eventDate,
        status: 'ACTIVE',
        dataValues: [
        {
        	dataElement: 'MZ5Ww7OZTgM',
        	value: 'Origin'
        }],

    }),
}

export const Create = ({ onCreate, orgUnit, trackedEntityInstance, enrollment, eventDate }) => {
    const [mutate] = useDataMutation(mutation, {
        onComplete: onCreate,
        variables: {
            orgUnit: orgUnit,
            trackedEntityInstance: trackedEntityInstance,
            enrollment: enrollment,
            eventDate: eventDate
        },
    })

    return (
        <button
            onClick={() => {
                mutate()
            }}
            style={{ margin: 10 }}
        >
            + Add Origin
        </button>
    )
}



