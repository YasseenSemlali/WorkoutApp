import { DataGrid } from "@mui/x-data-grid";
function WorkoutGrid(props) {
  const { workouts } = props;
  const columns = [
    { field: "distance", headerName: "Distance (km)", width: 180 },
    { field: "totalTimeString", headerName: "Time", width: 180 },
    { field: "avgSpeed", headerName: "Average Speed (km/hr)", width: 180 },
    { field: "maxAlt", headerName: "Maximum Altitude (m)", width: 180 },
    { field: "calsBurned", headerName: "Calories Burned", width: 180 },
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
      />
    </div>
  );
}

export default WorkoutGrid;
