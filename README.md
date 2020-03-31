# Meningitis APP

DHIS2 standard WebApp which controls the generation and maintenance of Origin's events for Meningitis Outbreak metadata.

## Getting Started

### Prerequisites

### Installing

## Algorithm used in the app

### Origin event control

	Initial request

		For each event
			if(CheckOrigin)						//It has origin event
				if(CheckHAO)					//It has the HAO field filled
					if(CheckParent)		//HAO and parent_orgUnit doesn't match
						if(originEvent_orgUnit != HAO)	//originEvent_orgUnit and HAO doesnt't match
							UpdateOrigin()
						else				//originEvent_orgUnit and HAO do match
							DO NOTHING
					else					//HAO and parent_orgUnit do match
						DeleteOrigin()
				else						//It has the HAO field not filled
					DeleteOrigin()
			else 							//It has not origin event
				if(CheckHAO)  					//It has the HAO field filled
					if(CheckParent) 		//HAO and parent_orgUnit doesn't match
						CreateOrigin()
					else 					//HAO and parent_orgUnit do match
						DO NOTHING
				else						//It has the HAO field not filled
					DO NOTHING

### Data element HAO control

	For each event
		if(CheckHAO)
			Does...? -> Yes  	//Program Rule
		else
			Does...? -> Yes/No 	//App

## Author

* **Sergio Valenzuela** - *Design and development* - [velasvalen17](https://github.com/velasvalen17)


