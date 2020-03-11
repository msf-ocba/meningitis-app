import React from 'react'
import { useDataQuery, useDataMutation } from '@dhis2/app-runtime'

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

function GetParent ({ event }) {
    const query = {
        parent: {
            resource: 'organisationUnits',
            id: `${event.orgUnit}`
        }
    }
    const { loading, error, data, refetch } = useDataQuery(query)


    return(
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

function GetHAO ({ event }) {
    const query = {
        attributes: {
            resource: 'trackedEntityInstances',
            id: `${event.trackedEntityInstance}`
        }
    }
    const { loading, error, data, refetch } = useDataQuery(query)

    return (
        <div>
            {loading && <span>...</span>}
            {error && <span>{`ERROR: ${error.message}`}</span>}
            {data && (
                <>
                    <pre>
                        {data.attributes.attributes.map(atr => {
                            if(atr.attribute=="ybzHJswr3Te"){
                                return <li> HAO: {atr.value} </li>
                            }
                        })}    
                    </pre>
                </> 
            )}
        </div>
    )
}

function CreateEvent ({ onCreate, orgUnit, trackedEntityInstance, enrollment, eventDate }) {
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
                            <>
                            <GetParent
                                key={ev.event}
                                event={ev}
                            />
                            <GetHAO
                                key={ev.event}
                                event={ev} 
                            />
                            </>
                        ))}
                    </pre>
            	</>
			)}
            <CreateEvent 
                onCreate={() => refetch()}
                orgUnit='JO5hBKMbsie'
                trackedEntityInstance='tp3NE8ZuUNZ'
                enrollment='pkKMR3mAMaK'
                eventDate='2020-01-03T00:00:00.000'
            />
		</div>
			
	)}