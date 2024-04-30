export default function Table({ title, readings }) {
  const filteredReadings = readings.filter(
    (reading) => reading.metertype === title
  );

  return (
    <div>
      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {filteredReadings.map((reading) => (
            <tr key={reading.id}>
              <td>{new Date(reading.date).toLocaleDateString()}</td>
              <td>{reading.readingvalue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
