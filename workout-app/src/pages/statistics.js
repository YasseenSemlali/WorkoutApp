import {
  Container, Typography
} from "@mui/material";
import StatisticsView from "../components/StatisticsView";
import WorkoutGrid from "../components/WorkoutGrid"
import { useStatistics, useWorkouts } from "../hooks";
function Statistics() {
  const { workouts } = useWorkouts("asdf");
  const { statistics: dailyStatistics } = useStatistics(workouts);
  const { statistics: weeklyStatistics } = useStatistics(workouts);
  const { statistics: overallStatistics } = useStatistics(workouts);

  return (
    <Container>
          <Typography variant="h4">All Workouts</Typography>
          <WorkoutGrid workouts={workouts} />
          <StatisticsView id="daily" stats={dailyStatistics} showAverageSpeed showAlt/>
          <StatisticsView id="overall" stats={overallStatistics} workouts={workouts} showAverageSpeed/>
          <StatisticsView id="weekly" stats={weeklyStatistics} workouts={workouts} displayGrid />
    </Container>
  );
}
export default Statistics;
