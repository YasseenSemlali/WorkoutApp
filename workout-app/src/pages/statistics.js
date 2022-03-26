import {
  Container, Typography
} from "@mui/material";
import { useMemo } from "react";
import StatisticsView from "../components/StatisticsView";
import WorkoutGrid from "../components/WorkoutGrid";
import { useStatistics, useWorkouts } from "../hooks";

function Statistics() {
  const d = useMemo(() => new Date("2021-07-17"), []);
  const { workouts } = useWorkouts("asdf");
  const weeklyWorkouts = useMemo(() => workouts.filter(w => daysBetween(w.startTime, d) <= 7), [workouts, d]);
  const dailyWorkouts = useMemo(() => workouts.filter(w => daysBetween(w.startTime, d) <= 1), [workouts, d]);
  const { statistics: dailyStatistics } = useStatistics(dailyWorkouts);
  const { statistics: weeklyStatistics } = useStatistics(weeklyWorkouts);
  const { statistics: overallStatistics } = useStatistics(workouts);

  return (
    <Container>
      <Typography variant="h4">All Workouts</Typography>
      <WorkoutGrid workouts={workouts} />
      <StatisticsView id="daily" stats={dailyStatistics} showAverageSpeed showAlt />
      <StatisticsView id="overall" stats={overallStatistics} workouts={workouts} showAverageSpeed />
      <StatisticsView id="weekly" stats={weeklyStatistics} workouts={workouts} displayGrid />
    </Container>
  );
}
export default Statistics;

function daysBetween(dateParam, today) {
  var time_diff = today.getTime() - dateParam.getTime();
  var date_diff = time_diff / (1000 * 3600 * 24);
  return date_diff;
}