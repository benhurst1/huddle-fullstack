import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";

export default function Home() {
  const [houses, setHouses] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredHouses = houses.filter((house) => {
    const houseData =
      `${house.house_number} ${house.street_address} ${house.city} ${house.postcode}`.toLowerCase();
    return houseData.includes(search.toLowerCase());
  });

  useEffect(() => {
    fetch("/api/houses")
      .then((response) => response.json())
      .then((data) => setHouses(data));
  }, []);

  const clickHandle = (id) => () => {
    navigate(`/house/${id}`);
  };

  return (
    <>
      <Header />
      <div className="homepage">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="houseList">
          {filteredHouses.length > 0 &&
            filteredHouses.map((house) => (
              <button
                key={house.id}
                className="houseBtn"
                onClick={clickHandle(
                  house.id,
                  house.house_number,
                  house.street_address,
                  house.city,
                  house.postcode
                )}
              >
                <h2>
                  {house.house_number} {house.street_address}, {house.city}
                  {house.postcode}
                </h2>
              </button>
            ))}
        </div>
      </div>
    </>
  );
}
