import React, { useState, useEffect } from 'react'
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
            {loading && <span>...</span>}
            {error && <span>{`ERROR: ${error.message}`}</span>}
            {data && (
                <>
                    <pre>
                        {data.attributes.attributes.map(atr => {
                            
                            if(atr.attribute == "ybzHJswr3Te") 
                                if(atr.value != parent) 
                                    return (
                                    <>
                                        <CheckOrigin //if (GET Query(Is there an origin event for this enrollment already?)) then
                                            trackedEntityInstance={event.trackedEntityInstance}
                                            hao_enrollment={atr.value}
                                            enrollment_id={event.enrollment}
                                            eventDate={event.eventDate}

                                        />
                                    </>
                                    )
                                }
                            
                        )} 
                    </pre>
                </> 
            )}
        </div>
    )
}

function CheckOrigin ({ trackedEntityInstance, hao_enrollment, enrollment_id, eventDate}) {
    const query = {
        origin: {
            resource: 'events',
            params: {
                trackedEntityInstance: `${trackedEntityInstance}`,
                filter:'MZ5Ww7OZTgM:eq:Origin'
            }
        }
    }
    const { loading, error, data, refetch } = useDataQuery(query)
    return(
        <div>
            <ul><li> HAO org unit: {hao_enrollment} </li></ul>
            <ul><li> Parent org unit and HAO org unit doesn't match </li></ul>
            {loading && <span>...</span>}
            {error && <span>{`ERROR: ${error.message}`}</span>}
            {data && (
                <>
                    <pre>
                        {data.origin.events.map(ev => {
                            if(ev.dataValues.some(dataelement => dataelement.value === "Origin")) { //if (GET Query(Is there an origin event for this enrollment already?)) then
                                if(ev.orgUnit != hao_enrollment) { //if (org unit from origin event <> hao_enrollment) then
                                    return(
                                        <>
                                        <li> Origin Event: {ev.event} </li>
                                        <ul><ul><li> There is an origin event already created but we need to update its org unit </li></ul></ul>
                                        <UpdateEvent 
                                        onUpdate={() => refetch()}
                                        orgUnit={hao_enrollment}
                                        ev={ev}
                                        />
                                        </>
                                    )
                                    
                                } else {
                                    return(
                                        <>

                                        <ul><ul><li> There is an origin event already created and we don't need to create or update </li></ul></ul>
                                        </>
                                    )
                                }
                            }
                        })}
                        {!data.origin.events.length && (//CREATE Query (origin event with hao_enrollment as org unit)
                            <>  
                                <ul><ul><li> There is not an origin event already created so we need to create one </li></ul></ul>
                                <CreateEvent 
                                onCreate={() => refetch()}
                                orgUnit={hao_enrollment}
                                trackedEntityInstance={trackedEntityInstance}
                                enrollment={enrollment_id}
                                eventDate={eventDate}
                                />
                            </>
                        )}
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

    useEffect(() => {
        mutate()
        console.log("Event created!!")
    })

    return (
        <>
        {/**
        <button
            onClick={() => {
                mutate()
                console.log("Event created!!")
            }}
            style={{ margin: 10 }}
        >
            + Add Origin
        </button>
        **/}
        </>
    )
}

function UpdateEvent ({ onUpdate, orgUnit, ev }) { 
    const mutation = {
        resource: 'events',
        type: 'update',
        id: ({ id }) => id,
        partial: false,
        data: ({ event, orgUnit, trackedEntityInstance, enrollment, eventDate }) => ({ 
            program: 'VOEVJzwp4F7',
            event,
            programStage: 'UFGwxeTgzZD',
            orgUnit,
            trackedEntityInstance,
            enrollment,
            eventDate,
            attributeCategoryOptions: 'rHGSHuG4Ts5',
            dataValues: [
            {
                dataElement: 'MZ5Ww7OZTgM',
                value: 'Origin'
            }],

        }),

    }   
    const [mutate] = useDataMutation(mutation, {
        onComplete: onUpdate,
        variables: { 
            id: ev.event,
            event: ev.event,
            orgUnit: orgUnit,
            trackedEntityInstance: ev.trackedEntityInstance,
            enrollment: ev.enrollment,
            eventDate: ev.eventDate
        },
    })

    useEffect(() => {
        mutate()
        console.log("Event " + ev.event + " updated!!")
    })

    return (


        <>
        {/**
        <button
            onClick={() => {
                mutate()
                console.log("Event " + ev.event + " updated!!")
            }}
            style={{ margin: 10 }}
        >
            + Update Origin
        </button>
        **/}
        </>
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
			<h3>Event List</h3>
			{loading && <span>...</span>}
            {error && <span>{`ERROR: ${error.message}`}</span>}
            {data && (
                <>
                	<pre>
                        {data.events.events.map(ev => (
                            <>
                            <li> First Visit Event: {ev.event} </li>
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