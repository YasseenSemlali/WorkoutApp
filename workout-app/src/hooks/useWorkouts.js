import file1 from "../assets/gpx/Workout-2021-06-06-11-57-42.gpx";
import file2 from "../assets/gpx/Workout-2021-06-18-13-36-30.gpx";
import file3 from "../assets/gpx/Workout-2021-07-10-13-33-52.gpx";
import file4 from "../assets/gpx/Workout-2021-07-17-12-54-07.gpx";
import { getTotalTime, getAvgSpeed, timeToString } from "../utils/statisticsCalculator";
import { useEffect, useState, useMemo } from "react";
import { Workout } from '../models'
const gpxParser = require("gpxparser");

export const useWorkouts = (username) => {
    const [workouts, setWorkouts] = useState([])
    const gpx = useMemo(() => new gpxParser(), []);

    useEffect(() => {
        async function exec() {
            let wrk = await Promise.all([file1, file2, file3, file4].map(async (f, i) => {
                let file = await fetch(f)
                let text = await file.text()

                gpx.parse(text);
                const regex = /<s2t:energy>(\d*)<\/s2t:energy>/
                const calsBurned = text.match(regex)[1];
                const totalDistance = (gpx.tracks[0].distance.total / 1000).toFixed(2); // distance in km
                const points = gpx.tracks[0].points;
                const totalTime = getTotalTime(points); // time in ms
                const totalTimeString = timeToString(totalTime); 
                const avgSpeed = getAvgSpeed(totalDistance, points); // avg speed in km/hr
                const maxAlt = gpx.tracks[0].elevation.max; //max altitude in m

                const w = new Workout({
                    id: i + 1,
                    distance: totalDistance,
                    totalTime: totalTime,
                    totalTimeString: totalTimeString,
                    avgSpeed: avgSpeed,
                    maxAlt: maxAlt,
                    calsBurned: calsBurned
                })
                return w
            }))

            setWorkouts(wrk)
        }
        exec()
    }, [gpx]);

    return { workouts: workouts, setWorkouts: setWorkouts }
}