import { Typography, Container, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useMemo, useState } from "react";

function Graphs() {
  const options = useMemo(() => [
    ['Elevation/Rise Intensity', 'http://127.0.0.1:5000/elevation'],
    ['Distance Travelled', ''],
    ['Activity Recap', 'http://127.0.0.1:5000/activity_recap'],
    ['Moving Average', 'http://127.0.0.1:5000/moving_avg']
  ], [])

  const [url, setUrl] = useState('')
  return (
    <Container>
      <Box display='flex'>
        <Box>
          {
            options.map(o => <Button onClick={() => setUrl(o[1])}>
              {o[0]}
              </Button>)
          }
        </Box>
        <Box><iframe src={url} style={{ width: '918px', height: '450px' }} /></Box>
      </Box>

    </Container>
  );
}
export default Graphs;
