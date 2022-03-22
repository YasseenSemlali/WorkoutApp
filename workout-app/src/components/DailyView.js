import {
    Typography,
    Paper,
    Stack,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
  } from "@mui/material";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import { timeToString } from "../utils/statisticsCalculator";
  import { styled } from "@mui/material/styles";
  import { defaultListboxReducer } from "@mui/base";
  
  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  
  const Label = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
  }));
  
  const Value = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
  }));

  
function DailyView(props) {
    const { id, stats } = props;
  
    return (
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${id}-content`}
          id={`${id}-header`}
        >
          <Typography variant="h5">{`${id.charAt(0).toUpperCase() + id.slice(1)} Statistics`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Item>
              <Label variant="h5">Total Distance</Label>
              <Value variant="h6">{`${stats.totalDistance} km`}</Value>
            </Item>
            <Item>
              <Label variant="h5">Total Time</Label>
              <Value variant="h6">{timeToString(stats.totalTime)}</Value>
            </Item>
            <Item>
              <Label variant="h5">Average Speed</Label>
              <Value variant="h6">{`${stats.avgSpeed} km/hr`}</Value>
            </Item>
              <Item>
              <Label variant="h5">Max Altitude</Label>
              <Value variant="h6">{`${stats.maxAlt} m`}</Value>
            </Item>
          </Stack>
        </AccordionDetails>
      </Accordion>
    );
  }

  export  default DailyView;