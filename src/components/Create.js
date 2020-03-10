import React, { useState, useRef } from 'react'
import { useDataMutation } from '@dhis2/app-runtime'

const mutation = {
    resource: 'events',
    type: 'create',
    partial: true,
    data: ({ orgUnit, tei, enrollment, eventDate }) => ({
        program: 'VOEVJzwp4F7',
        programStage: 'UFGwxeTgzZD',
        orgUnit,
        trackedEntityInstance: tei,
        enrollment,
        eventDate,
        status: 'ACTIVE',
        dataValues: {
        	dataElement: 'MZ5Ww7OZTgM'
        	value: 'First visit'
        },

    }),
}



