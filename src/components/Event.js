import React, { useState, useRef, useEffect } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'

export const Event = ({ event }) => {

    const [parent, setParent] = useState(null)
	
	const query = {
	    parent: {
	        resource: 'organisationUnits',
	        id: `${event.orgUnit}`
	    }
	}

	const { loading, error, data, refetch } = useDataQuery(query)

    var parent2 = null

    useEffect(() => {
        if(data){
            setParent(parent2);
            console.log(parent2);
        }
        
    });

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
                	<pre {...parent2 = data.parent.parent.id}>
                        <li> Parent: {parent2} </li>
                    </pre>
                </>
            )}
        </div>
    )
}