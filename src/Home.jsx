import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";

export default function Home() {
  const [houses, setHouses] = useState([]);

  const navigate = useNavigate();

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
      <div className="houseList">
        {houses.length > 0 &&
          houses.map((house) => (
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
    </>
  );
}
