import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./components/Header";
import Form from "./components/Form";
import Table from "./components/Table";

export default function House() {
  const { id } = useParams();
  const [readings, setReadings] = useState([]);

  useEffect(() => {
    fetch(`/api/houses/${id}`)
      .then((response) => response.json())
      .then((data) => setReadings(data));
  }, []);

  return (
    <>
      <Header />
      <div className="formAndTables">
        <Form houseid={id} />
        <div className="tables">
          <Table title={"Electricity"} readings={readings} />
          <Table title={"Gas"} readings={readings} />
        </div>
      </div>
    </>
  );
}
