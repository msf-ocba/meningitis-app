import React from 'react'
import { DataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { useConfig } from '@dhis2/app-runtime'
import { useDataQuery } from '@dhis2/app-runtime'
import { Provider } from '@dhis2/app-runtime'
import { useDataMutation } from '@dhis2/app-runtime'
import NameForm from './NameForm'
import AddButton from './AddButton'



const initialquery = {
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

{/*const mutation = {
    resource: 'events',
    type: 'create',
    data: ({ name }) => ({
        name,
        shortName: name,
        indicatorType: {
            id: 'bWuNrMHEoZ0',
        },
        numerator: '#{fbfJHSPpUQD}',
        denominator: '#{h0xKKjijTdI}',
    }),
}*/}

function StoreEvents(props) {
  const events = props.events;
  return (
    <ul>
      {events.map((event) =>
        <ListItem key={event.toString()}
                  value={event} />

      )}
    </ul>
  );
}

function WriteMessage() {
    return (
        <li> End of event </li>)
}

function CheckParent(props) {
    const query = {
        orgunit: {
            resource: 'organisationUnits/Pyt3nwQOO6a',
        }
    }
    const { loading, error, data } = useDataQuery(query)
    {JSON.parse(data)}
    return (
        <li> HOLA </li>
        )
    }


const MeningitisApp = () => {
    const { loading, error, data } = useDataQuery(initialquery)
    return (
            <>
                {console.log(JSON.stringify(data))}
                {data && (
                <pre>
                {data.events.events.map(ev => (
                    <>
                    <li>Event_id: {ev.event}</li>
                    <li>Enrollment_id: {ev.enrollment}</li>
                    <li>Event_date: {ev.eventDate}</li>
                    <li>OrgUnit: {ev.orgUnit}</li>
                    <li>{ev.dataValues[0].value}</li>
                    {WriteMessage()}
                    <CheckParent parent='Pyt3nwQOO6a'/>
                    </>
                    ))}
                </pre>
                )}
            </>

        )
    
}

export default MeningitisApp

{/*
const CheckEvent = props => {
}

const CreateEvent = props => {
}

const DeleteEvent = props => {
}

const EventController = props => {
}



{/*const MyApp = () => 


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