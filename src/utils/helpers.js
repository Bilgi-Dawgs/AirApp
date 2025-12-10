// Plane templates (örnek) -- rows, seatsPerRow, businessRows count
export const PLANE_TEMPLATES = {
    "A320": { rows: 30, seatsPerRow: 6, businessRows: 2 },   // typical 3-3 layout
    "B737": { rows: 28, seatsPerRow: 6, businessRows: 3 },
    "A330": { rows: 40, seatsPerRow: 9, businessRows: 6 }    // 3-3-3 layout
  };
  
  // create seat label e.g., 12A, 12B ...
  export function seatLabel(row, seatIndex, seatsPerRow) {
    // seat letters: A,B,C... (seatIndex 0 based)
    const letter = String.fromCharCode(65 + seatIndex);
    return `${row}${letter}`;
  }
  
  // Build seating map (2D array) with seat objects
  export function buildSeatMap(planeType) {
    const tpl = PLANE_TEMPLATES[planeType] || PLANE_TEMPLATES["A320"];
    const seats = [];
    for (let r = 1; r <= tpl.rows; r++) {
      const rowSeats = [];
      for (let s = 0; s < tpl.seatsPerRow; s++) {
        rowSeats.push({
          label: seatLabel(r, s, tpl.seatsPerRow),
          row: r,
          seatIndex: s,
          type: r <= tpl.businessRows ? "business" : "economy",
          occupiedBy: null // passenger id or crew id
        });
      }
      seats.push(rowSeats);
    }
    return seats;
  }
  
  // Greedy seat assignment: assign missing seat_numbers to available seats by seat_type
  export function assignSeats(seatMap, passengers) {
    // flatten seats and filter by type
    const flat = seatMap.flat();
    // index of seats by label for quick lookup
    const seatIndex = Object.fromEntries(flat.map(s => [s.label, s]));
    // mark already taken seats
    passengers.forEach(p => {
      if (p.seat_number) {
        const seat = seatIndex[p.seat_number];
        if (seat) seat.occupiedBy = p.passenger_id;
      }
    });
  
    // assign for economy then business (or vice versa): ensure seat_type match
    const needSeats = passengers.filter(p => (p.seat_type && !p.seat_number));
    // try to assign grouped affiliated passengers next to each other (simple attempt)
    // first sort by seat_type then by passenger_id
    needSeats.sort((a,b)=> a.seat_type === b.seat_type ? a.passenger_id - b.passenger_id : a.seat_type === "business" ? -1 : 1);
  
    for (const p of needSeats) {
      const avail = flat.find(s => s.type === p.seat_type && !s.occupiedBy);
      if (avail) {
        avail.occupiedBy = p.passenger_id;
        p.seat_number = avail.label;
      } else {
        // fallback: any free seat
        const any = flat.find(s => !s.occupiedBy);
        if (any) {
          any.occupiedBy = p.passenger_id;
          p.seat_number = any.label;
        } else {
          // no seats remain (shouldn't happen if flight capacity validated)
          console.warn("No seat to assign for passenger", p);
        }
      }
    }
    // return updated seatMap and passenger list
    return { seatMap, passengers };
  }
  