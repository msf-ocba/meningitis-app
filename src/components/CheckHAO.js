import React, { useState, useEffect } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import CheckParent from './CheckParent'
import DeleteOrigin from './DeleteOrigin'

/**
Function that receives a First visit event (object) from CheckOrigin function
(EventList) and a flag which specify whether it has an origin event associated
or not. It calls to the API to evaluate if the HAO field is filled or not.
Moreover, depending on the origin flag:
	-With origin flag == true:
	 Evaluates if the HAO orgUnit and the Origin orgUnit are the same or it needs 
	 to be updated
	-With origin flag == false:
	 Evaluates if the HAO orgUnit and the Parent orgUnit of the First Visit event 
	 are the same or it needs to be created a new Origin event
**/

export const CheckHAO = ({event, origin, eventOrigin}) => {

	const query = {
        attributes: {
            resource: 'trackedEntityInstances',
            id: `${event.trackedEntityInstance}`,
        }
    }

	const { loading, error, data, refetch } = useDataQuery(query)

	return (
		<div>
			{data && origin && (
                <>
                    <pre>
                			{data.attributes.attributes.map(attribute => {
                				if(attribute.valueType === "ORGANISATION_UNIT"){
                					return(
	                					<>
	                            		<ul><ul><li> There is origin and HAO is filled </li></ul></ul>
	                            		<ul><ul><li> CheckParent with {attribute.value} </li></ul></ul>
	                            		<CheckParent
	                            			key={event.event} 
	                            			event={event}
	                            			origin={origin}
	                            			eventOrigin={eventOrigin}
	                            			haoOrgunit={attribute.value}

	                            		/>
	                        			</>
                        			)
                				}
                			})}

							{!data.attributes.attributes.some(attribute => attribute.valueType === "ORGANISATION_UNIT") && (
                    			<>
                            		<ul><ul><li> DeleteOrigin() </li></ul></ul>
                            		<DeleteOrigin 
	                    						id={eventOrigin.event}
                					/>
                        		</>
                            )}
                    </pre>
                </> 
            )}

            {data && !origin && (
            	<>
                    <pre>
                    		{data.attributes.attributes.map(attribute => {
                    			if(attribute.valueType === "ORGANISATION_UNIT"){
                    				return(
		                    			<>
		                            		<ul><ul><li> There is not origin and HAO is filled </li></ul></ul>
		                            		<CheckParent
			                            			key={event.event} 
			                            			event={event}
			                            			origin={origin}
			                            			eventOrigin={null}
			                            			haoOrgunit={attribute.value}

		                            		/>
		                            		
		                        		</>
                            		)
                    			}
                			})}  
							{!data.attributes.attributes.some(attribute => attribute.valueType === "ORGANISATION_UNIT") && (
                    			<>
                            		<ul><ul><li> There is not origin event and HAO is not filled </li></ul></ul>
                            		<ul><ul><li> DO NOTHING </li></ul></ul>
                        		</>
                            )}
                    </pre>
                </> 
        	)}

		</div>
	)
}

export default CheckHAO
