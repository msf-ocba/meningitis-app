import React, { useState, useEffect } from 'react'
import { useDataQuery, useDataMutation } from '@dhis2/app-runtime'

export const CheckHAO = ({event, origin}) => {

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
                    		{data.attributes.attributes.some(attribute => attribute.valueType === "ORGANISATION_UNIT") && (
                    			<>
                            		<ul><ul><li> There is origin and HAO is filled </li></ul></ul>
                        		</>
                            )}  
							{!data.attributes.attributes.some(attribute => attribute.valueType === "ORGANISATION_UNIT") && (
                    			<>
                            		<ul><ul><li> Delete Origin </li></ul></ul>
                        		</>
                            )}
                    </pre>
                </> 
            )}

		</div>
	)
}

export default CheckHAO
