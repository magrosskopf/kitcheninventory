export default function FilterBar() {
  return (
    <div className="flex flex-row">
      <select className="select select-bordered w-1/3 mr-2" defaultValue="">
        <option disabled>Lagerort</option>
        <option>Kühlschrank</option>
        <option>Vorratsschrank rechts unten</option>
        <option>Schrank mitte</option>
      </select>
      <select className="select select-bordered w-1/3 mr-2" defaultValue="">
        <option disabled>Kategorie</option>
        <option>Obst</option>
        <option>Gemüse</option>
        <option>Beilagen</option>
      </select>
      <select className="select select-bordered w-1/3" defaultValue="">
        <option disabled>Menge</option>
        <option>Aufsteigend</option>
        <option>Absteigend</option>
      </select>
    </div>
  );
}
