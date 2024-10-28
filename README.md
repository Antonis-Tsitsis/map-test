
## Goal 

What we want here, is to create a generic filtering process for some cities and show them to the map. 

The mock data (from the backend if existed) is a json that contains the keys of the cities and values dictionaries of climate hazards (type, magnitude and probaility) that the city is suffering from.

You have to edit the reusable component, SelectMultiple.js. The component will have as an argument the type of filter (climate hazard type, magnitude and probaility), and will return the filtered cities that include one or more filter types chosen by user. The goal is to have a reusable component for filtering cities based on different filter types and values.

The desired output should be the cities on the map filtered by the filter values used by user. If the user chooses values from the same or different types of filters, the cities should contain all of the filters in order to be rendered on the map.

There are some hints in the code, that are not the mandatory way of solving this.


## Run the app
1. yarn install
2. yarn start
