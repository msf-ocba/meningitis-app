import React from 'react'
import { DataQuery } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { useConfig } from '@dhis2/app-runtime'
import { useDataQuery } from '@dhis2/app-runtime'
import { Provider } from '@dhis2/app-runtime'
import { useDataMutation } from '@dhis2/app-runtime'


class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An Org Unit was submitted ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Org Unit ID:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

const appConfig = {
    baseUrl: 'https://dev.hmisocba.msf.es',
    apiVersion: 30,
}


const query = {
    events: {
        resource: 'events.json',
        filter: {
            startDate: '2020-01-01'
        },
        params: {
            orgUnit: 'wg60MeX0Txd',
            ouMode: 'DESCENDANTS',
            pageSize: 10,
            order: 'eventDate',
        },
    },
}

const query2 = {

}

const mutation = {
    resource: 'indicators',
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
}

const AddButton = ({ onCreate }) => {
    const [mutate] = useDataMutation(mutation, {
        onComplete: onCreate,
        variables: {
            orgUnit: 'Pyt3nwQOO6a',
        },
    })

    return (
        <button
            onClick={() => {
                mutate()
            }}
            style={{ margin: 10 }}
        >
            Add Origin Events
        </button>
    )
}

const AddButton2 = ({ onCreate }) => {
    const [mutate] = useDataMutation(mutation, {
        onComplete: onCreate,
        variables: {
            orgUnit: 'Pyt3nwQOO6a',
        },
    })

    return (
        <button
            onClick={() => {
                mutate()
            }}
            style={{ margin: 10 }}
        >
            Delete Origin Events
        </button>
    )
}

const AddButton3 = ({ onCreate }) => {
    const [mutate] = useDataMutation(mutation, {
        onComplete: onCreate,
        variables: {
            orgUnit: 'Pyt3nwQOO6a',
        },
    })

    return (
        <button
            onClick={() => {
                alert('New origin events have been created!')
                event.preventDefault();
            }}
            style={{ margin: 10 }}
        >
            Add Origin Events
        </button>
    )
}

const AddButton4 = ({ onCreate }) => {
    const [mutate] = useDataMutation(mutation, {
        onComplete: onCreate,
        variables: {
            orgUnit: 'Pyt3nwQOO6a',
        },
    })

    return (
        <button
            onClick={() => {
                alert('Corrections have been made and origin events have been deleted!')
                event.preventDefault();
            }}
            style={{ margin: 10 }}
        >
            Delete Origin Events
        </button>
    )
}


const MeningitisApp = () => {

}

const AskEvents = () => {
    const { loading, error, data } = useDataQuery(query)
    return (
            <>
                {/*
                <h3>Events (first 10)</h3>
                {loading && <span>...</span>}
                {error && <span>{`ERROR: ${error.message}`}</span>}
                {data && (
                    <pre>
                        {data.events.events
                            .map(ev => ev.eventDate)
                            .join('\n')}
                    </pre>

                )}
                */}
                <br></br>
                <div><NameForm/></div>
                <AddButton3/>
                <AddButton4/>
            </>

        )
    
}

export default AskEvents

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