import React from 'react'
import { useDataQuery, useDataMutation } from '@dhis2/app-runtime'


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
            {/**<li> Event: {event.event} </li>
            <li> EventDate: {event.eventDate} </li>
            <li> Enrollment: {event.enrollment} </li>
            <li> OrgUnit: {event.orgUnit} </li>**/}
            
            {loading && <span>...</span>}
            {error && <span>{`ERROR: ${error.message}`}</span>}
            {data && (
                <>
                    <pre>
                        <ul><li> Parent org unit: {data.parent.parent.id} </li></ul>
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
            {/**<li> Entro en GETHAO </li>**/}
            {loading && <span>...</span>}
            {error && <span>{`ERROR: ${error.message}`}</span>}
            {data && (
                <>
                    <pre>
                        {data.attributes.attributes.map(atr => {
                            
                            if(atr.attribute == "ybzHJswr3Te") { //If attribute is HAO
                                if(atr.value != parent) { //if parent_orgunit <> hao_enrollment then
                                    return (
                                    <>
                                        {/**<li> HAO: {atr.value} </li>**/}
                                        <CheckOrigin //if (GET Query(Is there an origin event for this enrollment already?)) then
                                            trackedEntityInstance={event.trackedEntityInstance}
                                            hao_enrollment={atr.value}
                                        />
                                    </>
                                    )
                                }
                            }
                        })}    
                    </pre>
                </> 
            )}
        </div>
    )
}

function CheckOrigin ({ trackedEntityInstance, hao_enrollment}) {
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
            {/**<li> Entro en CheckOrigin </li>
            <li> TrackedentityInstance: {trackedEntityInstance} </li>**/}
            {loading && <span>...</span>}
            {error && <span>{`ERROR: ${error.message}`}</span>}
            {data && (
                <>
                <ul><li> HAO org unit: {hao_enrollment} </li></ul>
                <ul><li> Los campos no coinciden </li></ul>
                    {/**<li> Entro en CheckOrigin </li>**/}
                    <pre>
                        {data.origin.events.map(ev => {
                            if(ev.dataValues.some(dataelement => dataelement.value === "Origin")) { //if (GET Query(Is there an origin event for this enrollment already?)) then
                                if(ev.orgUnit != hao_enrollment) { //if (org unit from origin event <> hao_enrollment) then
                                    return(
                                        <>
                                        <ul><li> Ya hay un evento origen y hay que actualizar </li></ul>
                                        <UpdateEvent 
                                        onCreate={() => refetch()}
                                        orgUnit={hao_enrollment}
                                        id={ev.event}
                                        />
                                        </>
                                    )
                                    
                                } else {
                                    return(
                                        <>
                                        <ul><ul><li> Ya hay un evento origen y no hay que actualizar </li></ul></ul>
                                        </>
                                    )
                                }
                            }
                            else { //CREATE Query (origin event with hao_enrollment as org unit)
                                return(
                                    <>
                                    <ul><ul><li> No hay un evento origen y hay que crear </li></ul></ul>
                                    <CreateEvent 
                                    onCreate={() => refetch()}
                                    orgUnit={hao_enrollment}
                                    trackedEntityInstance={trackedEntityInstance}
                                    enrollment={ev.enrollment}
                                    eventDate={ev.eventDate}
                                    />
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

function UpdateEvent ({ onCreate, orgUnit, id }) {
    const mutation = {
        type: 'update',
        resource: 'events',
        id: ({ id }) => ({
            id   
        }),
        partial: 'true',
        data: ({ orgUnit }) => ({
            orgUnit,
        }),
    }   
    const [mutate] = useDataMutation(mutation, {
        onComplete: onCreate,
        variables: {
            orgUnit: orgUnit,
            id: id
        },
    })

    return (
        <button
            onClick={() => {
                mutate()
            }}
            style={{ margin: 10 }}
        >
            + Update Origin
        </button>
    )
}

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
                            <>
                            {console.log("Evento: " + ev.event)}
                            <li> Evento: {ev.event} </li>
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