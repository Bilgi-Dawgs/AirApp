import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography } from "@mui/material";

export default function CrewTable({ pilots = [], cabin = [] }) {
  return (
    <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
      <Paper sx={{ p: 2, flex: 1 }}>
        <Typography variant="h6">Pilots</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Seniority</TableCell>
              <TableCell>Vehicle</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pilots.map(p => (
              <TableRow key={p.pilot_id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.seniority_level}</TableCell>
                <TableCell>{p.vehicle_type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Paper sx={{ p: 2, flex: 1 }}>
        <Typography variant="h6">Cabin Crew</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Vehicles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cabin.map(a => (
              <TableRow key={a.attendant_id}>
                <TableCell>{a.name}</TableCell>
                <TableCell>{a.attendant_type}</TableCell>
                <TableCell>{Array.isArray(a.vehicle_types) ? a.vehicle_types.join(", ") : a.vehicle_types}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
