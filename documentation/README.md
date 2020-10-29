# Use case tests

This is the detailed description of the use case tests that have been run against the app to verify that all the new features implemented are working and that the original Meningitis App's functionality still works as it should.

## New features

- **Upgrade 1. App parameterization:** Outbreak app should accept orgUnit, program and
  “type of visit” dataelement variables as parameters, so MSF technicians can execute the app
  over different orgUnits, programs and origin dataelements than the default and hardcoded
  ones.
- **Upgrade 2. Dynamic “LastUpdatedDuration” variable:** Outbreak app should be able to
  filter the events which should be modified during the execution time, so when the number of
  events across different programs grows in MSF HMIS database the resource consumption
  could be minimized as much as possible.

## DataStore

---

With these tests we expect to see how the Outbreak App interacts with the DHIS2 DataStore.

## Use case 1: Initial Outbreak App execution

During the Outbreak App's initial execution in any DHIS2 instance, the Outbreak App's namespace should not exist. Once the app is executed, the namespace is created and inside the "settings" key two variables should appear:

- initialExecutionDate
- dataElement

### Preparation

Measles's program should be the only program with the attribute "Include in Outbreak App" (IOA Attribute) set to true.
We need to open the "Datastore Manager" app and delete the outbreakApp namespace (if already exists).

### Expected Output

We need to execute Outbreak App and in the Datastore Manager it should appear the outbreakApp namespace with two keys: objects and settings.
Inside the settings key, two variables should get generated:

- initialExecutionDate: (current time - 1 day)
- dataElement: default id value

## Use case 2: Following Outbreak App executions

In Outbreak App's following executions the values of these two variables (initialExecutionDate and dataElement) should get updated.

### Preparation

After the initial execution of Outbreak App and with the outbreakApp's namespace created in the DataStore, we have to edit the dataElement value with any other id (we can make it up). We need to reload Outbreak App.

### Expected Output

In the DataStore Manager the values got updated:

- initialExecutionDate: (current time - 1 day)
- dataElement: modified id value

## Parameter "program"

---

The attribute "Include in Outbreak App" (IOA attribute) works as a flag for Outbreak App to decide whether the programs should be included during its execution or not. Only the programs with this attribute set to true will have their events analyzed by Outbreak App.

## Use case 3: Add a new program to the Outbreak App execution

### Preparation

Execute Outbreak App with only Measles program included in the execution. Check the Execution log implemented directly in Outbreak App interface or a more detailed one using Chrome's console.

### Expected Output

Include the Meningitis Linelist program setting the IOA Attribute to true.
Execute Outbreak App again and check the execution log, the new program should appear now in the program list.

## Use case 4: Delete a program from the Outbreak App execution

### Preparation

Execute Outbreak App with Measles and Meningitis programs included in the execution. Check the Execution log implemented directly in Outbreak App interface or a more detailed one using Chrome's console.

### Expected Output

Set to false the IOA Attribute in Meningitis Linelist program.
Execute Outbreak App again and check the execution log, only Measles program should appear in the program list.

## Parameter "orgUnit"

---

Adding the orgUnit as a parameter (along with the initialExecutionDate) make the Outbreak App able to be executed in a much more efficient way than Meningitis App. Outbreak App is executed at project level (level 4 in MSF's hierarchy), so it could be executed on some projects but not on others in the same mission (even if events are registered at level 5 or 6).

    When configuring the access settings in a program to be included in Outbreak App, it is mandatory that not only the level 6 (health services => health structures) are assigned to the program, but the level 5 (health sites => health areas) as well, because the "origin type" of event it is created at level 5 (health area level) not at level 6 like the "first visit type" of event.

## Use case 5: Assign new orgUnits to a program

### Preparation

Execute Outbreak App and check in the logs (in chrome's console) the programs and the orgUnits that are included in the execution. Go to maintenance and assign new orgUnits (level 5 and 6) to one of the programs included in the execution. Execute Outbreak App again and check the logs.

### Expected Output

The program and the parent orgUnit (level 4) of the new orgUnits assigned to the program should appear in the execution logs.

## Parameter "dataElement"

---

In order to refactor the hardcoded variables, the id of the dataElement "type of visit" has been implemented as a parameter that can be changed through the DHIS2 Data Store Manager app. By default it uses the original id for this dataElement "MZ5Ww7OZTgM".

## Use Case 6: Change the dataElement id in the DataStore

### Preparation

Execute Outbreak App and check the logs to see what programs and orgUnits are getting processed.
In the Data Store Manager App, change the attribute id for another one (it doesn't matter if it is not real).

### Expected output

If the new attribute id is real and there are events (linked to the programs and the orgUnits which are being processed by the Outbreak App) using it, the logs will reflect a normal execution flow.
Otherwise, no events will be processed and the logs will show it.

## Parameter "initialExecutionDate"

---

This variable it is used in the EventList component to request for the events that should be processed by Outbreak App. It is used as a filter to optimize the request to the API and its response. This way, DHIS2 API will answer with the events whose creation date is later than the value of this variable.

During the initial execution, Outbreak App fixes this value using the creation date (oldest) of the programsn involved in the execution. During following executions, Outbreak App fixes this value using the current date/time of the execution minus one day (to avoid problems derived from the different timezones where the app is executed and used).

## Use Case 7: How the app works during the initial execution

### Preparation

- Delete outbreak app namespace from the Data Store Manager, so we force an initial execution behaviour.
- Enable at least one program (using the IOA Attribute) with events needing Origin type of visits or with Origin type of visits already created (Measled or Meningitis should work)
- Execute Outbreak App and check the logs using chrome's console.

### Expected Output

- In the logs, it should appear the execution flow using the date of creation of the oldest program as initialExecutionDate variable.
- In the DataStore, it should appear the current date of execution minus one day in the initialExecutionDate variable.

## Use Case 8: How the app works during following executions. Part 1

### Preparation

Using the scenario reached in the Use Case 7, execute again Outbreak App and check the number of events processed for each program and org unit.

### Expected Output

- In the logs, this execution should be done using the last execution date/time (not the date of creation of any program).

- In the Data Store Manager app, the initialExecutionDate should have been updated with the current execution date/time - 1 day.

## Use Case 8: How the app works during following executions. Part 2

### Preparation

Using the scenario reached in the part 1, register a new patient (in a program which is included to be processed by Outbreak App) and fill the HAO attribute with a different HAO than the registering unit one. Execute Outbreak App again.

### Expected Output

- In the logs, the number of events appearing in the logs should have been incremented by one (for the new event).

- In the Tracker Capture, the origin type of event should have been created for the new registered patient.
