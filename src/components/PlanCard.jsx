import { Link } from "react-router-dom";

function PlanCard({ plan }) {
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={plan.coverImg}
        className="card-img-top"
        alt={plan.name}
        style={{ height: "220px", objectFit: "cover" }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{plan.name}</h5>

        <p className="card-text text-muted">
          {plan.description.slice(0, 90)}...
        </p>

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
