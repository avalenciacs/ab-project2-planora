import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPlanById, updateVotes } from "../services/plans.service";

function PlanDetails() {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    loadPlan();

    const votedPlans = JSON.parse(localStorage.getItem("votedPlans")) || [];
    setHasVoted(votedPlans.includes(id));
  }, [id]);

  const loadPlan = async () => {
    const data = await getPlanById(id);
    setPlan(data);
  };

  if (!plan) {
    return <p className="text-center mt-5">Loading plan...</p>;
  }

  const activities = plan.actividades
    ? Object.values(plan.actividades)
    : [];

  const handleVote = async () => {
    if (hasVoted) return;

    const newVotes = (plan.votes || 0) + 1;
    await updateVotes(id, newVotes);

    setPlan({ ...plan, votes: newVotes });

    const votedPlans = JSON.parse(localStorage.getItem("votedPlans")) || [];
    localStorage.setItem(
      "votedPlans",
      JSON.stringify([...votedPlans, id])
    );

    setHasVoted(true);
  };

  const handleUnvote = async () => {
    if (!hasVoted) return;

    const newVotes = Math.max((plan.votes || 0) - 1, 0);
    await updateVotes(id, newVotes);

    setPlan({ ...plan, votes: newVotes });

    const votedPlans = JSON.parse(localStorage.getItem("votedPlans")) || [];
    localStorage.setItem(
      "votedPlans",
      JSON.stringify(votedPlans.filter(pid => pid !== id))
    );

    setHasVoted(false);
  };

  return (
    <div className="container my-5">

      <img
        src={plan.coverImg}
        alt={plan.name}
        className="img-fluid rounded mb-4"
        style={{ maxHeight: "450px", width: "100%", objectFit: "cover" }}
      />

      <h1>{plan.name}</h1>
      <p className="text-muted">{plan.description}</p>

      {/* VOTES */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <span className="fs-5">⭐ {plan.votes || 0} votes</span>

        {!hasVoted ? (
          <button className="btn btn-outline-primary" onClick={handleVote}>
            👍 Vote
          </button>
        ) : (
          <button className="btn btn-outline-danger" onClick={handleUnvote}>
            👎 Remove vote
          </button>
        )}
      </div>

      <hr />

      <h4>Activities</h4>

      <div className="row g-4">
        {activities.map((act, index) => (
          <div className="col-md-4" key={index}>
            <div className="card h-100">
              {act.img && (
                <img
                  src={act.img}
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <span className="badge bg-secondary mb-2">
                  {act.type}
                </span>
                <h5>{act.title}</h5>
                <p className="text-muted">{act.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default PlanDetails;
