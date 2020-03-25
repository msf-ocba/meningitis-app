# Meningitis APP

DHIS2 standard WebApp which controls the generation and maintenance of Origin's events for Meningitis Outbreak metadata.

## Getting Started

### Prerequisites

### Installing

## Algorithm used in the app

	Initial_request = GET Query(Initial request of events)

	While (There are events in the initial request)
	
		For each event

			StoreInfo(Parse the fields of interest from Initial_request)

			parent_orgunit = GET Query(Ask for the parent id of the org unit of the event - Health area level)
			hao_enrollment = GET Query(Ask for the HAO filled in the HAO field in the enrollment)

			if parent_orgunit <> hao_enrollment then
				if (GET Query(Is there an origin event for this enrollment already?)) then
					if (org unit from origin event <> hao_enrollment) then
						DELETE Query (old origin event)
						CREATE Query (origin event with hao_enrollment as org unit)
				else
					CREATE Query (origin event with hao_enrollment as org unit)

## Author

* **Sergio Valenzuela** - *Design and development* - [velasvalen17](https://github.com/velasvalen17)


