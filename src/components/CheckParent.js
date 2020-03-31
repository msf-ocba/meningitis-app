import React, { useState, useEffect } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'

/**

**/


export const CheckParent = ({event, origin}) => {

	const query = {
        attributes: {
            resource: 'trackedEntityInstances',
            id: `${event.trackedEntityInstance}`,
        }
    }

    const { loading, error, data, refetch } = useDataQuery(query)

	return (
		<div>
		</div>
	)

}

export default CheckParent