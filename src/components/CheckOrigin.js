import React, { useState, useEffect } from 'react'
import { useDataQuery, useDataMutation } from '@dhis2/app-runtime'
import CheckHAO from './CheckHAO'

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