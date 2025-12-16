import { Link } from "react-router-dom";

function PlanCard({ plan }) {
  return (
    <div className="card plan-card h-100">
      <img src={plan.coverImg} className="card-img-top" alt={plan.name} />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{plan.name}</h5>

        <p className="card-text">{plan.description}</p>

        <Link
          to={`/plans/${plan.id}`}
          className="btn btn-outline-primary mt-auto"
        >
          View details
        </Link>
      </div>
    </div>
  );
}

export default PlanCard;
