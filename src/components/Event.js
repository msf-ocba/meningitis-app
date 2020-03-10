import React, { useState, useRef } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import { Parent } from './Parent'

export const Event = ({ event }) => {
    return (
        <div>
            <li> Event: {event.event} </li>
            <li> EventDate: {event.eventDate} </li>
            <li> Enrollment: {event.enrollment} </li>
            <li> OrgUnit: {event.orgUnit} </li>
        </div>
    )
}