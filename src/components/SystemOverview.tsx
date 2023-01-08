import { round } from "lodash";
import { intervalToDuration, formatDuration } from "date-fns";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { useSystemOverview } from "../prometheus";

export default function SystemOverview() {
  const { data } = useSystemOverview();

  if (!data) {
    return null;
  }

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ paddingBottom: 1 }}>
          System Overview
        </Typography>

        <Grid container>
          <Section xs={4} title="CPU Usage" value={`${round(data.cpu, 2)}%`} />
          <Section
            xs={4}
            title="Memory Usage"
            value={`${round(data.memory, 2)}%`}
          />
          <Section
            xs={4}
            title="Root Filesystem"
            value={`${(round(data.rootFilesystem), 2)}%`}
          />
          <Section
            xs={4}
            title="Media Filesystem"
            value={`${round(data.media, 2)}%`}
          />
          <Section
            xs={4}
            title="Apps Filesystem"
            value={`${round(data.apps, 2)}%`}
          />
          <Section
            xs={4}
            title="Uptime"
            value={`${formatDuration(
              intervalToDuration({
                start: 0,
                end: data.uptime * 1000,
              })
            )}`}
          />
        </Grid>
      </CardContent>
    </Card>
  );
}

interface SectionProps {
  title: string;
  value: string;
  xs?: number;
}

function Section({ title, value, xs }: SectionProps) {
  return (
    <Grid xs={xs}>
      <Box sx={{ paddingTop: 1 }}>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textTransform: "uppercase" }}
        >
          {title}
        </Typography>
        <Typography variant="h6">{value}</Typography>
      </Box>
    </Grid>
  );
}
