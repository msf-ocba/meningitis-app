import React, { useState, useEffect } from 'react'
import { useDataQuery, useDataMutation } from '@dhis2/app-runtime'
import CheckHAO from './CheckHAO'


/**
Function that receives a First Visit type of event (object) from EventList and 
check if it has an origin event associated through the trackedEntityInstance. 
It redirects the app flow to the CheckHAO function.
**/

const CheckOrigin = ({ event }) => {

	const query = {
        origin: {
            resource: 'events',
            params: {
                trackedEntityInstance: `${event.trackedEntityInstance}`,
                filter:'MZ5Ww7OZTgM:eq:Origin'
            }
        }
    }

	const { loading, error, data, refetch } = useDataQuery(query)

	return (
		<div>
			{data && (
                <>
                    <pre>
                    	{data.origin.events.map(ev => {
                    		return(
                    			<>
                    			<ul><li> Origin Event </li></ul>
                    			<CheckHAO
                    				key={event.event}
                    				event={event}
                    				origin={true}
                    				eventOrigin={ev}
                    			/>
                    			</>
                			)

                		})}
                        {!data.origin.events.length && (
                        	<>
                    		<ul><li> No Origin Event </li></ul>
                    		<CheckHAO
                    				key={event.event}
                    				event={event}
                    				origin={false}
                    				eventOrigin={null}
                			/>
                    		</>
						)}
                    </pre>
                </>    
            
            )}
        </div>
	)
}

export default CheckOrigin