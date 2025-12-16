import { Link } from "react-router-dom";

function PlanCard({ plan }) {
  return (
    <div className="card h-100 position-relative">

      {/* ⭐ VOTES */}
      <div
        className="position-absolute top-0 end-0 m-2 px-2 py-1 bg-white rounded shadow-sm"
        style={{ fontSize: "0.9rem" }}
      >
        ⭐ {plan.votes || 0}
      </div>

      <img
        src={plan.coverImg}
        className="card-img-top"
        alt={plan.name}
        style={{ height: "180px", objectFit: "cover" }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{plan.name}</h5>

        <p className="card-text text-muted">
          {plan.description}
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
