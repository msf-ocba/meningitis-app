import React, { useState, useEffect } from 'react'
import { useDataQuery, useDataMutation } from '@dhis2/app-runtime'
import CheckOrigin from './CheckOrigin'

const query = {
    events: {
        resource: 'events.json',
        params: {
            orgUnit: 'wg60MeX0Txd',
            ouMode: 'DESCENDANTS',
            program: 'VOEVJzwp4F7',
            lastUpdatedDuration: '300d',
            filter:'MZ5Ww7OZTgM:eq:First visit',
            skipPaging:'true'
        }
    }
}


export const EventList = () => {
	const { loading, error, data, refetch } = useDataQuery(query)

	return (
		<div>
			<h3>Event List</h3>
			{loading && <span>...</span>}
            {error && <span>{`ERROR: ${error.message}`}</span>}
            {data && (
                <>
                	<pre>
                        
                        {data.events.events.map(ev => (
                            <>
                            <li> First Visit Event: {ev.event} </li>
                            <CheckOrigin
                                key={ev.event}
                                event={ev}
                            />
                            </>
                        ))}
                        
                    </pre>
            	</>
			)}
		</div>
			
	)}