import React, { useState, useEffect } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import CreateOrigin from './CreateOrigin'
import UpdateOrigin from './UpdateOrigin'
import DeleteOrigin from './DeleteOrigin'

/**

**/


export const CheckParent = ({event, origin, eventOrigin, haoOrgunit}) => {

	const query = {
        parent: {
            resource: 'organisationUnits',
            id: `${event.orgUnit}`,
            params: {
                includeAncestors: 'true'
            }
    	}
	}	

    const { loading, error, data, refetch } = useDataQuery(query)

	return (
		<div>
			{data && origin && (
				<>
                    <pre>
                    {data.parent.organisationUnits.map(orgUnit => {
                    	if(orgUnit.level == 5){
                    			if(haoOrgunit != orgUnit.id){
                    				if(eventOrigin.orgUnit != haoOrgunit){
                    					return(
                						<>
	                    					<ul><ul><ul><ul><li> Level 5 and HAO different of parentOrgUnit {orgUnit.id}</li></ul></ul></ul></ul>
	                    					<ul><ul><ul><ul><li> UpdateOrigin() </li></ul></ul></ul></ul>
	                    					<UpdateOrigin 
	                    						orgUnit={haoOrgunit}
	                    						ev={eventOrigin}
	                    					/>
                						</>
                						)
                    				} 
                    			} else {
                    				return(
                    					<>
	                    					<ul><ul><ul><ul><li> Level 5 and HAO equal parentOrgUnit {orgUnit.id}</li></ul></ul></ul></ul>
	                    					<ul><ul><ul><ul><li> DeleteOrigin() </li></ul></ul></ul></ul>
	                    					<DeleteOrigin 
	                    						id={eventOrigin.event}
	                    					/>
                						</>
                					)
                    			}
                    		
                    	}
                    })}
                    </pre>
               	</>
			)}
			{data && !origin && (
            	<>
                    <pre>
                    {data.parent.organisationUnits.map(orgUnit => {
                    	if(orgUnit.level == 5){
                    			if(haoOrgunit != orgUnit.id){
                    				return(
                    					<>
	                    					<ul><ul><ul><ul><li> Level 5 and HAO different of parentOrgUnit {orgUnit.id}</li></ul></ul></ul></ul>
	                    					<ul><ul><ul><ul><li> CreateOrigin() </li></ul></ul></ul></ul>
	                    					<CreateOrigin 
	                    						orgUnit={haoOrgunit}
	                    						trackedEntityInstance={event.trackedEntityInstance}
	                    						enrollment={event.enrollment}
	                    						eventDate={event.eventDate}
	                    					/>
                						</>
                					)
                    			} else {
                    				return(
                    					<>
	                    					<ul><ul><ul><ul><li> Level 5 and HAO equal parentOrgUnit {orgUnit.id}</li></ul></ul></ul></ul>
	                    					<ul><ul><ul><ul><li> DO NOTHING </li></ul></ul></ul></ul>
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

export default CheckParent