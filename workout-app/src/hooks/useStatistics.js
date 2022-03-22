import { useEffect, useState } from "react";
import { Statistics } from '../models';

export const useStatistics = (workouts) => {
    const [statistics, setStatistics] = useState({})

    useEffect(() => {
        const totalTime = workouts.reduce((total, next) => total + next.totalTime, 0);
        const totalDistance = workouts.reduce((total, next) => total + next.distance, 0);
        const averageDistance = totalDistance / workouts.length;
        const avgSpeed = workouts.reduce((total, next) => total + next.avgSpeed, 0) / workouts.length;
        const maxAlt = workouts.reduce((a, b) => a.maxAlt > b.maxAlt ? a.maxAlt : b.maxAlt, 0);

        const stat = new Statistics({
            totalDistance: totalDistance,
            avgDistance: averageDistance,
            totalTime: totalTime,
            avgSpeed: avgSpeed.toFixed(2),
            maxAlt: maxAlt
        })
        setStatistics(stat);
      }, [workouts]);
    

      return {statistics: statistics, setStatistics: setStatistics}
}