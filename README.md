# Meningitis APP

DHIS2 standard WebApp which controls the generation and management of origin events for Meningitis Linelist metadata.

## Overview

_Meningitis App_ has been developed in _Javascript_ using _React_ framework as it is recommended by [DHIS2 core developer team](https://dhis2designlab.github.io/).

EHAS delivers the app already bundled and ready to install in a DHIS2 instance (v.3x) through _App Management_ app.

## Purpose

_Meningitis App_ was designed for MSF-OCBA DHIS2 servers working together with Meningitis Linelist metadata, already configured by EHAS, as an extension of its functionality. In order to enable the maintenance and/or modification of this app's code this guide will help to MSF-OCBA technicians to:

- Setup the development environment
- Understand the execution's flow of the app
- Understand the structure of the app
- Build and bundle the app from its source code

## Setup a development environment

This section will explain how to setup a development environment to work with DHIS2 React Apps in general and with Meningitis App in particular.

### Prerequisites

Nodejs has to be installed: [NodeJS](https://nodejs.org/en/)

### Installing dependencies

The app is getting built and bootstrapped using _d2-app-scripts_ libraries. These libraries are installed as dependencies by default when it is run the command:

## Execution flow chart

!["Event's flowchart during the execution of the app"](./images/flowchart.png)

### Origin event control and HAO DE integrated control

The logic for this is...

### Data element HAO control general

We thought that it would be easier if we update every first event in order to make sure that the dataelements had the data we wanted.

## Author

- **Sergio Valenzuela** - _Design and development_ - [velasvalen17](https://github.com/velasvalen17)
