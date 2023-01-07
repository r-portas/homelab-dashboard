import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

export default function Header() {
  return (
    <AppBar position="relative">
      <Toolbar>
        <RocketLaunchIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
          Homelab Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
