import SeatMap from "./components/roster/SeatMap";

function App() {
  const handleSeatSelect = (seat) => {
    console.log("Selected seat:", seat);
  };

  return (
    <div>
      <SeatMap onSeatSelect={handleSeatSelect} />
    </div>
  );
}

export default App;
