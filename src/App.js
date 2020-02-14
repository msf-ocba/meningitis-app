import React from 'react'
import { DataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { useConfig } from '@dhis2/app-runtime'
import { useDataQuery } from '@dhis2/app-runtime'
import { Provider } from '@dhis2/app-runtime'

const appConfig = {
    baseUrl: 'https://dev.hmisocba.msf.es',
    apiVersion: 30,
}


const query = {
    events: {
        resource: 'events.json',
        params: {
            orgUnit: 'wg60MeX0Txd',
            ouMode: 'DESCENDANTS',
            pageSize: 10,
        },
    },
}


const MyApp = () => 


{
    const { baseUrl, apiVersion } = useConfig()
    const { loading, error, data } = useDataQuery(query)

    return (
        <div className="container">
        {/*
        <style jsx>{`
            .container {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-size: 1rem;
            }
        }`}</style>
        */}
            {/*
            <h2>Base URL : {baseUrl}</h2>
            <h2>API Version : {apiVersion}</h2>
            */}
            <h1>Events (first 10)</h1>
            {loading && <span>...</span>}
            {error && <span>{`ERROR: ${error.message}`}</span>}
            {data && (
                <pre>
                    {data.events.events
                        .map(ev => ev.event)
                        .join('\n')}
                    <h1>Program</h1>   
                    {data.events.events
                        .map(ev2 => ev2.program)
                        .join('\n')}
                    <h1>Orgunits</h1>   
                    {data.events.events
                        .map(ev2 => ev2.orgUnitName)
                        .join('\n')}
                    <h1>Event type</h1> 
                    {data.events.events
                        .map(ev3 => ev3.dataValues[0].value)
                        .join('\n')}
                </pre>
            )}
        </div>
    )
}

export default MyApp

{/*(
    <div className="container">
        <style jsx>{`
            .container {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-size: 1rem;
            }
        }`}</style>
        
        
        <DataQuery query={query}>
            {({ error, loading, data }) => {
                if (error) return <span>ERROR</span>
                if (loading) return <span>...</span>
                return (
                    <>
                        <div>
                            <h3>Indicators (first 10)</h3>
                            
                            {error && <span>{`ERROR: ${error.message}`}</span>}
                            {data && (
                                <pre>
                                    {data.indicators.indicators
                                        .map(ind => ind.displayName)
                                        .join('\n')}
                                </pre>
                            )}
                        </div>

                    </>
                )
            }}
        </DataQuery>
        



    </div>
)
*/}