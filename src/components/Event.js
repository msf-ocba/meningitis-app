import React, { useState, useRef } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'

export const Event = ({ event }) => {
	
	const query = {
	    parent: {
	        resource: 'organisationUnits',
	        id: `${event.orgUnit}`
	    }
	}

	const { loading, error, data, refetch } = useDataQuery(query)
    return (
        <div>
            <li> Event: {event.event} </li>
            <li> EventDate: {event.eventDate} </li>
            <li> Enrollment: {event.enrollment} </li>
            <li> OrgUnit: {event.orgUnit} </li>
            
            {loading && <span>...</span>}
            {error && <span>{`ERROR: ${error.message}`}</span>}
            {data && (
            	<>
                	<pre>
                        <li> Parent: {data.parent.parent.id} </li>
                    </pre>
                </>
            )}
        </div>
    )
}