import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Services from "../src/components/Services";

export default function Home() {
  return (
    <Container sx={{ paddingTop: 2 }} maxWidth="lg">
      <Services />
    </Container>
  );
}
