import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSystemOverview } from "../prometheus";

export default function SystemOverview() {
  const { data } = useSystemOverview();

  if (!data) {
    return null;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">System Overview</Typography>

        <Table>
          <TableBody>
            <TableRow>CPU Usage</TableRow>
            <TableRow>{data.cpu}</TableRow>
          </TableBody>
          <TableBody>
            <TableRow>Memory Usage</TableRow>
            <TableRow>{data.memory}</TableRow>
          </TableBody>
          <TableBody>
            <TableRow>Root Filesystem</TableRow>
            <TableRow>{data.rootFilesystem}</TableRow>
          </TableBody>
          <TableBody>
            <TableRow>Media Filesystem</TableRow>
            <TableRow>{data.media}</TableRow>
          </TableBody>
          <TableBody>
            <TableRow>Apps Filesystem</TableRow>
            <TableRow>{data.apps}</TableRow>
          </TableBody>
          <TableBody>
            <TableRow>Uptime</TableRow>
            <TableRow>{data.uptime}</TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
