import React from "react";
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@mui/material";

export default function PassengersTable({ passengers = [] }) {
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6">Passengers ({passengers.length})</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Seat Type</TableCell>
            <TableCell>Seat No</TableCell>
            <TableCell>Parent</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {passengers.map(p => (
            <TableRow key={p.passenger_id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.age}</TableCell>
              <TableCell>{p.seat_type || (p.age <= 2 ? "Infant" : "")}</TableCell>
              <TableCell>{p.seat_number || "-"}</TableCell>
              <TableCell>{p.parent_id || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
