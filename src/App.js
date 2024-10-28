import React, { useEffect, useState } from "react";
import { Grid, Button, Typography, Paper } from "@material-ui/core";
import { Map } from "./Map";
import { SelectMultipleSearch } from "./SelectMultipleSearch"; 
import { SelectMultiple } from "./SelectMultiple"; 
import { HAZARDTYPES, PROBABILITY, MAGNITUDE } from "./options";
import { SelectMultipleBar } from "./SelectMultipleBar"; 

import mockData from "./MOCK_DATA.json";

const cities_coordinates = {};

export default function App() {
  const [filteredCities, setFilteredCities] = useState({});
  const [typeFilters, setTypeFilters] = useState([]);
  const [magnitudeFilters, setMagnitudeFilters] = useState([]);
  const [probabilityFilters, setProbabilityFilters] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    const transformedData = mockData.reduce((acc, item) => {
      const city = item.city;

      if (!acc[city]) {
        acc[city] = [];
        cities_coordinates[city] = { lat: item.lat, lng: item.lng };
      }

      acc[city].push({
        type: item.type,
        probability: item.probability,
        magnitude: item.magnitude,
      });

      return acc;
    }, {});

    setData(transformedData);
  }, []);

  const applyFilters = (selectedOptions, group) => {
    if (group === "type") setTypeFilters(selectedOptions);
    if (group === "magnitude") setMagnitudeFilters(selectedOptions);
    if (group === "probability") setProbabilityFilters(selectedOptions);
  };

  const clearFilters = () => {
    setTypeFilters([]);
    setMagnitudeFilters([]);
    setProbabilityFilters([]);
  };

  const isClearDisabled = !(
    typeFilters.length ||
    magnitudeFilters.length ||
    probabilityFilters.length
  );

  useEffect(() => {
    const filterCities = () => {
      const filtered = Object.keys(data).reduce((result, cityName) => {
        const hazards = data[cityName];
        const matches = hazards.some(
          (hazard) =>
            (!typeFilters.length || typeFilters.includes(hazard.type)) &&
            (!magnitudeFilters.length ||
              magnitudeFilters.includes(hazard.magnitude)) &&
            (!probabilityFilters.length ||
              probabilityFilters.includes(hazard.probability))
        );
        if (matches) {
          result[cityName] = {
            coordinates: cities_coordinates[cityName],
            hazards: hazards,
            name: cityName,
          };
        }
        return result;
      }, {});
      setFilteredCities(filtered);
    };
    filterCities();
  }, [data, typeFilters, magnitudeFilters, probabilityFilters]);

  const cityCount = Object.keys(filteredCities).length;

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Paper
          elevation={3}
          style={{
            width: "95%",
            padding: "2px",
            background: "linear-gradient(to right, #f0f0f0, #ffffff)",
            borderRadius: "8px",
            margin: "auto",
          }}
        >
          <Grid
            container
            spacing={2}
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Grid item lg={2}>
              <SelectMultipleSearch 
                filterType="Hazard Type"
                filterOptions={HAZARDTYPES}
                filters={typeFilters}
                group="type"
                applyFilters={applyFilters}
              />
            </Grid>
            <Grid item lg={2}>
              <SelectMultipleBar
                filterType="Probability"
                filterOptions={PROBABILITY}
                filters={probabilityFilters}
                group="probability"
                applyFilters={applyFilters}
              />
            </Grid>
            <Grid item lg={2}>
              <SelectMultiple
                filterType="Magnitude"
                filterOptions={MAGNITUDE}
                filters={magnitudeFilters}
                group="magnitude"
                applyFilters={applyFilters}
              />
            </Grid>
            <Grid item lg={2} style={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={clearFilters}
                disabled={isClearDisabled}
                style={{
                  backgroundColor: isClearDisabled ? "#aaa" : "#333",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Clear Filters
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
        <Paper
          elevation={3}
          style={{
            padding: "5px",
            borderRadius: "12px",
            border: "2px solid #ccc",
            overflow: "hidden",
            width: "85%",
            maxWidth: "1000px",
          }}
        >
          <Map data={filteredCities} />
        </Paper>
      </Grid>

      <Grid item lg={12} style={{ textAlign: "center" }}>
        <Typography
          variant="h6"
          style={{
            width: "90%",
            color: "#fff",
            backgroundColor: "#111111",
            borderRadius: "8px",
            padding: "1px 20px",
            margin: "auto",
          }}
        >
          {cityCount > 0
            ? `${cityCount} cities found`
            : "No cities found with those filters"}
        </Typography>
        <Typography>
          Data are not real, they are just for demonstration purposes. Created
          using Mockaroo.
        </Typography>
      </Grid>
    </Grid>
  );
}
