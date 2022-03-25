import { DataGrid } from "@mui/x-data-grid";
import { timeToString, dateToString } from "../utils/statisticsCalculator";
function WorkoutGrid(props) {
  const { workouts, disableFilters } = props;

  const columns = [
    { field: "date", sortable:false , headerName: "Date", width: 180 },
    { field: "distance", sortable:!disableFilters, headerName: "Distance (km)", width: 180 },
    { field: "totalTime", sortable:!disableFilters, headerName: "Time (hr:min:sec)", width: 180 },
    { field: "avgSpeed", sortable:!disableFilters, headerName: "Average Speed (km/hr)", width: 180 },
    { field: "maxAlt", sortable:!disableFilters, headerName: "Maximum Altitude (m)", width: 180 },
    { field: "calsBurned", sortable:!disableFilters, headerName: "Calories Burned", width: 160 },
  ];

  const rows = workouts.map(({ totalTime, startTime, ...rest }) => ({
    totalTime: timeToString(totalTime),
    date: dateToString(startTime),
    ...rest,
  }));

  return (
    <div style={{ height: 400, width: "100%", marginTop: 30 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        getRowId={(row) => row.id}
        disableColumnFilter={disableFilters}
        disableColumnMenu={disableFilters}
        disableColumnSelector={disableFilters}
      />
    </div>
  );
}

export default WorkoutGrid;
