import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { BASE_URL } from "../config/api";

function PlanList() {
  const [places, setPlaces] = useState({});

  useEffect(() => {
    axios
      .get(`${BASE_URL}/places.json`)
      .then((res) => setPlaces(res.data))
      .catch((err) => console.log(err));
  }, []);

  const placesArray = Object.entries(places);

  return (
    <div className="container">
      <div className="row">
        {placesArray.map(([id, place]) => (
          <div className="col-md-4 mb-4" key={id}>
            <div className="card h-100">
              {/* Imagen */}
              <img
                src={place.coverImg}
                className="card-img-top"
                alt={place.name}
                style={{ height: "200px", objectFit: "cover" }}
              />

              <div className="card-body">
                <h5 className="card-title">{place.name}</h5>
                <p className="card-text">{place.description}</p>

                <hr />

                {/* Experiences */}
                <h6>Experiences</h6>
                <ul className="small">
                  {place.experiencias.map((exp, i) => (
                    <li key={i}>
                      <strong>{exp.title}:</strong> {exp.text}
                    </li>
                  ))}
                </ul>

                <hr />

                {/* Places to eat */}
                <h6>Places to eat</h6>
                {place.lugaresParaComer.map((food, i) => (
                  <div className="d-flex mb-2" key={i}>
                    <img
                      src={food.img}
                      alt={food.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        marginRight: "10px",
                      }}
                    />
                    <div>
                      <strong>{food.name}</strong>
                      <br />
                      <small>{food.note}</small>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card-footer bg-white border-0">
                <Link to={`/plans/${id}`} className="btn btn-outline-primary btn-sm">
                  View details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlanList;