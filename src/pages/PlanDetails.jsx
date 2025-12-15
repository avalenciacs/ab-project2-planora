import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPlanById } from "../services/plans.service";

function PlanDetails() {
  const { planId } = useParams();
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    loadPlan();
  }, []);

  const loadPlan = async () => {
    const data = await getPlanById(planId);
    setPlan(data);
  };

  if (!plan) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container my-5">

      {/* HERO IMAGE */}
      <img
        src={plan.coverImg}
        alt={plan.name}
        className="img-fluid rounded mb-4"
        style={{ maxHeight: "450px", width: "100%", objectFit: "cover" }}
      />

      <h1>{plan.name}</h1>
      <p className="text-muted">{plan.description}</p>

      <hr />

      {/* EXPERIENCES */}
      <h4>Experiences</h4>
      <ul>
        {plan.experiencias.map((exp, index) => (
          <li key={index}>
            <strong>{exp.title}:</strong> {exp.text}
          </li>
        ))}
      </ul>

      <hr />

      {/* PLACES TO EAT */}
      <h4>Places to eat</h4>

      <div className="row g-3">
        {plan.lugaresParaComer.map((place, index) => (
          <div className="col-md-6" key={index}>
            <div className="card h-100">
              <img
                src={place.img}
                className="card-img-top"
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h6>{place.name}</h6>
                <p className="text-muted">{place.note}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default PlanDetails;
