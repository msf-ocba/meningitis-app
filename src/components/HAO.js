import React, { useState, useRef } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'

export const HAO = ({ event }) => {

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