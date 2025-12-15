import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

const TabularView = ({ people }) => {
  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{ borderRadius: 2, overflowX: "auto" }}
    >
      <Table size="medium" sx={{ minWidth: 600 }}>
        <TableHead sx={{ bgcolor: "#f4f6f8" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Role / Class</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Seat</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {people.map((person) => (
            <TableRow key={person.id} hover>
              <TableCell>{person.id}</TableCell>
              <TableCell>
                <Chip
                  label={person.type}
                  size="small"
                  color={
                    person.type === "Pilot"
                      ? "error"
                      : person.type === "Cabin Crew"
                      ? "warning"
                      : "primary"
                  }
                  variant="outlined"
                  sx={{ fontWeight: "bold" }}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: "500" }}>{person.name}</TableCell>
              <TableCell>{person.role}</TableCell>
              <TableCell>
                <Chip label={person.seat || "N/A"} size="small" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TabularView;
