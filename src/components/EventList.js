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
                        <GetHAO
                                key={event.event}
                                event={event} 
                                parent={data.parent.parent.id}
                        />
                    </pre>
                </> 
            )}
        </div>
    )
}

function GetHAO ({ event, parent }) {
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
                            if(atr.attribute == "ybzHJswr3Te") {
                                if(atr.value != parent) {
                                    return (
                                    <>
                                        <li> HAO: {atr.value} </li>
                                        <CreateEvent 
                                            onCreate={() => refetch()}
                                            orgUnit={atr.value}
                                            trackedEntityInstance={event.trackedEntityInstance}
                                            enrollment={event.enrollment}
                                            eventDate={event.eventDate}
                                        />
                                        <CheckOrigin
                                            trackedEntityInstance={event.trackedEntityInstance}
                                        />
                                    </>
                                    )

                                }
                                return (
                                    <>
                                        <li> HAO: {atr.value} </li>
                                    </>
                                )
                            }
                        })}    
                    </pre>
                </> 
            )}
        </div>
    )
}

function CheckOrigin ({ trackedEntityInstance }) {
    const query = {
        origin: {
            resource: 'events',
            params: {
                trackedEntityInstance: `${trackedEntityInstance}`,
            }
        }
    }
    const { loading, error, data, refetch } = useDataQuery(query)

    return(
        <div>
            {loading && <span>...</span>}
            {error && <span>{`ERROR: ${error.message}`}</span>}
            {data && (
                <>
                    <pre>
                        {data.origin.events.map(ev => {
//Aquí tiene que ir el if event = origin then check orgunit and compare with HAO
    //Si es distinto update event
                        return(
                        
                            <li> EnrollmentCheckOrigin: {ev.event} </li>

                        )
                            
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

//function UpdateEvent


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
                            </>
                        ))}
                    </pre>
            	</>
			)}
		</div>
			
	)}