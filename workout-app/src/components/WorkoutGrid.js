import { DataGrid } from "@mui/x-data-grid";
import { timeToString } from "../utils/statisticsCalculator";
function WorkoutGrid(props) {
  const { workouts, disableFilters } = props;

  const columns = [
    { field: "startTime", sortable: !disableFilters, headerName: "Date", width: 220, type: 'dateTime' },
    { field: "distance", sortable: !disableFilters, headerName: "Distance (km)", width: 180, renderCell: (params) => params.value.toFixed(2), type: 'number'},
    { field: "totalTime", sortable: !disableFilters, headerName: "Time (hr:min:sec)", width: 180, renderCell: (params) => timeToString(params.value), type: 'number' },
    { field: "avgSpeed", sortable: !disableFilters, headerName: "Average Speed (km/hr)", width: 180, renderCell: (params) => params.value.toFixed(2), type: 'number' },
    { field: "maxAlt", sortable: !disableFilters, headerName: "Maximum Altitude (m)", width: 180, type: 'number' },
    { field: "calsBurned", sortable: !disableFilters, headerName: "Calories Burned", width: 160, renderCell: (params) => (params.value / 1000).toFixed(2), type: 'number' },
  ];

  return (
    <div style={{ height: 400, width: "100%", marginTop: 30 }}>
      <DataGrid
        rows={workouts}
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
