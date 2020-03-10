import React from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import { Event } from './Event'

const query = {
    events: {
        resource: 'events.json',
        params: {
            orgUnit: 'a6WpbJ7VABY',
            ouMode: 'DESCENDANTS',
            program: 'VOEVJzwp4F7',
            lastUpdatedDuration: '100d',
            filter:'MZ5Ww7OZTgM:eq:First visit'
        }
    }
}

export const EventList = () => {
	const { loading, error, data, refetch } = useDataQuery(query)
	return (
		<div>
			<h3>Events</h3>
			{loading && <span>...</span>}
            {error && <span>{`ERROR: ${error.message}`}</span>}
            {data && (
                <>
                	<pre>
                        {data.events.events.map(ev => (
                            <Event
                                key={ev.event}
                                event={ev}
                            />
                        ))}
                    </pre>
            	</>
			)}
		</div>
			
	)}