# Use case tests

This is the detailed description of the use case tests that are being made to the app to verify that all the new features implemented are working and the base Meningitis App functionality still works as it should.

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

With this tests we want to see how the Outbreak App interacts with the DHIS2 DataStore.

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

## Use case 1: Following Outbreak App executions

In Outbreak App's following executions the values of these two variables (initialExecutionDate and dataElement) should get updated.

### Preparation

After the initial execution of Outbreak App and with the outbreakApp's namespace created in the DataStore, we have to edit the dataElement value with any other id (we can make it up). We need to reload Outbreak App.

### Expected Output

In the DataStore Manager the values got updated:

- initialExecutionDate: (current time - 1 day)
- dataElement: modified id value

## Parameter "program"

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

Adding the orgUnit as a parameter (along with the initialExecutionDate) make the Outbreak App able to be executed in a much more efficient way than Meningitis App. Outbreak App is executed at project level (level 4 in MSF's hierarchy), so it could be executed on some projects but not on others in the same mission (even if events are registered at level 5 or 6).

    When configuring the access settings in a program to be included in Outbreak App, it is mandatory that not only the level 6 (health services => health structures) are assigned to the program, but the level 5 (health sites => health areas) as well, because the "origin type" of event it is created at level 5 (health area level) not at level 6 like the "first visit type" of event.

## Use case 5: Assign new orgUnits to a program

### Preparation

Execute Outbreak App and check in the logs (in chrome's console) the programs and the orgUnits that are included in the execution. Go to maintenance and assign new orgUnits (level 5 and 6) to one of the programs included in the execution. Execute Outbreak App again and check the logs.

### Expected Output

The program and the parent orgUnit (level 4) of the new orgUnits assigned to the program should appear in the execution logs.

## Parameter "dataElement"

## Parameter "initialExecutionDate"
