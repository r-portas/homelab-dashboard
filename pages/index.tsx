import Container from "@mui/material/Container";
import SystemOverview from "../src/components/SystemOverview";
import Services from "../src/components/Services";

export default function Home() {
  return (
    <Container sx={{ paddingTop: 2 }} maxWidth="lg">
      <SystemOverview />
      <Services />
    </Container>
  );
}
