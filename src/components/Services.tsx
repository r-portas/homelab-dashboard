import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import Stack from "@mui/material/Stack";
import { useUiServices, Service } from "../consul";
import Link from "./Link";
import SystemOverview from "./SystemOverview";

export default function Services() {
  const { data } = useUiServices();

  return (
    <Grid container spacing={2}>
      <Grid xs={12} sm={6} md={4}>
        <SystemOverview />
      </Grid>
      {data &&
        data.map((service) => (
          <ServiceCard key={service.name} service={service} />
        ))}
    </Grid>
  );
}

interface ServiceCardProps {
  service: Service;
}

function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Grid xs={12} sm={6} md={4}>
      <Card>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Icon
              sx={{
                // Match 24px = 3 * 2 + 1.125 * 16
                boxSizing: "content-box",
                // Increase the width a bit, to fit larger icons, like "tv"
                width: "1.5em",
              }}
              className={`fa-solid ${service.icon}`}
            />
            <Typography variant="h5">{service.name}</Typography>
          </Stack>
        </CardContent>
        <CardActions>
          <Button size="small" component={Link} noLinkStyle href={service.url}>
            Visit
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
