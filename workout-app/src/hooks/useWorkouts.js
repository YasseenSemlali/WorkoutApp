import { useEffect, useState } from "react";
import { Workout } from '../models';

export const useWorkouts = (username) => {
    const [workouts, setWorkouts] = useState([])
    console.log(workouts)

    useEffect(() => {
        fetch('http://localhost:8080/workouts.php')
            .then(response => {
                if (response.status >= 400 && response.status < 600) {
                    throw new Error("Bad response from server");
                }
                response.json()
                    .then(wrk => setWorkouts(wrk.map(w => new Workout(w))))
                    .catch(e => {
                        alert('Failed to fetch workouts')
                    })

            }).catch(e => {
                alert('Failed to fetch workouts')
            })
    }, []);

    return { workouts: workouts, setWorkouts: setWorkouts }
}