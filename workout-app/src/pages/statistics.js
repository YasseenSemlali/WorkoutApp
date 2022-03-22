import {
  Container,
} from "@mui/material";
import { useEffect, useState } from "react";
import firstFile from "../assets/gpx/Workout-2021-06-06-11-57-42.gpx";
import StatisticsView from "../components/StatisticsView";
import { getTotalTime, getAvgSpeed } from "../utils/statisticsCalculator";
import { useWorkouts } from "../hooks";

const gpxParser = require("gpxparser");

function Statistics() {
  const gpx = new gpxParser();
  const [overallStatistics, setOverallStatistics] = useState({});
  const [weeklyStatistics, setWeeklyStatistics] = useState({});

  const { workouts } = useWorkouts('asdf')
  console.log(workouts)
  
  useEffect(() => {
    fetch(firstFile)
      .then((r) => r.text())
      .then((text) => {
        gpx.parse(text);
        const totalDistance = (gpx.tracks[0].distance.total / 1000).toFixed(2); // distance in km
        const points = gpx.tracks[0].points;
        const totalTime = getTotalTime(points); // time in ms
        const avgSpeed = getAvgSpeed(totalDistance, points); // avg speed in km/hr
        const statsObj = {
          totalDistance,
          totalTime,
          avgSpeed,
        };
        setOverallStatistics(statsObj);
      });
  }, []);

  return (
    <Container>
          <StatisticsView id="overall" stats={overallStatistics} />
          <StatisticsView id="weekly" stats={weeklyStatistics} />
    </Container>
  );
}
export default Statistics;
