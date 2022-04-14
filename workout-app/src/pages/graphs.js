import { Button, Container, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useMemo, useState } from "react";
//https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
function isValidDate(dateString)
{
    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month === 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};

function Graphs() {
  const [window, setWindow] = useState('')
  const [date1, setDate1] = useState('')
  const [date2, setDate2] = useState('')
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
        <Box>
          <iframe src={url ? `${url}?window=${window}&date1=${isValidDate(date1) ? date1 : ''}&date2=${isValidDate(date2) ? date2 : ''}` : ''} style={{ width: '918px', height: '450px' }} />
        </Box>
      </Box>
      {/* moment("06/22/2015", "MM/DD/YYYY", true).isValid() */}
      {url === 'http://127.0.0.1:5000/moving_avg' ?
        <>
          Window Size <br />
          <TextField value={window} onChange={(e) => setWindow(e.target.value)} /><br />
          Date 1 <br />
          <TextField value={date1} placeholder='MM/DD/YYYY' onChange={(e) =>  setDate1(e.target.value)} /><br />
          Date 2 <br />
          <TextField value={date2} placeholder='MM/DD/YYYY' onChange={(e) => setDate2(e.target.value)} />
        </>
        : undefined}

    </Container>
  );
}
export default Graphs;
