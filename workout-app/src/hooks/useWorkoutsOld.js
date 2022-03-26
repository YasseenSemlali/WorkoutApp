import file1 from "../assets/gpx/Workout-2021-06-06-11-57-42.gpx";
import file2 from "../assets/gpx/Workout-2021-06-18-13-36-30.gpx";
import file3 from "../assets/gpx/Workout-2021-07-10-13-33-52.gpx";
import file4 from "../assets/gpx/Workout-2021-07-17-12-54-07.gpx";
import extra1 from "../assets/gpx/Extra-1.gpx";
import { getTotalTime, getAvgSpeed } from "../utils/statisticsCalculator";
import { useEffect, useState } from "react";
import { Workout } from '../models'
const gpxParser = require("gpxparser");

export const useWorkoutsOld = (username) => {
    const [workouts, setWorkouts] = useState([])

    useEffect(() => {
        async function exec() {
            let wrk = await Promise.all([file1, file2, file3, file4, extra1].map(async (f, i) => {
                let file = await fetch(f)
                let text = await file.text()
                const gpx =  new gpxParser()
                gpx.parse(text);
                const regex = /<s2t:energy>(\d*)<\/s2t:energy>/
                const match = text.match(regex)
                const calsBurned = match ? text.match(regex)[1] : 0;
                const totalDistance = (gpx.tracks[0].distance.total / 1000).toFixed(2); // distance in km
                const points = gpx.tracks[0].points;
                const startTime = points[0].time
                const totalTime = getTotalTime(points); // time in ms
                const avgSpeed = getAvgSpeed(totalDistance, points); // avg speed in km/hr
                const maxAlt = gpx.tracks[0].elevation.max; //max altitude in m

                const w = new Workout({
                    id: i + 1,
                    distance: totalDistance,
                    totalTime: totalTime,
                    avgSpeed: avgSpeed,
                    maxAlt: maxAlt,
                    calsBurned: calsBurned,
                    startTime: startTime,
                })
                return w
            }))

            setWorkouts(wrk)
        }
        exec()
    }, []);

    return { workouts: workouts, setWorkouts: setWorkouts }
}