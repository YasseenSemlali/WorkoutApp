import {
  Container
} from "@mui/material";
import DailyView from "../components/DailyView";
import StatisticsView from "../components/StatisticsView";
import { useStatistics, useWorkouts } from "../hooks";
function Statistics() {
  const { workouts } = useWorkouts('asdf')
  const {statistics: dailyStatistics} = useStatistics(workouts)
  const {statistics: weeklyStatistics} = useStatistics(workouts)
  const {statistics: overallStatistics} = useStatistics(workouts)

  return (
    <Container>
          <DailyView id="daily" stats={dailyStatistics} />
          <StatisticsView id="overall" stats={overallStatistics} />
          <StatisticsView id="weekly" stats={weeklyStatistics} />
    </Container>
  );
}
export default Statistics;
