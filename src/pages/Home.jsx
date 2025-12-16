import { useEffect, useState } from "react";
import PlanCard from "../components/PlanCard";
import { getAllPlans } from "../services/plans.service";

function Home({ search }) {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    const data = await getAllPlans();
    setPlans(data);
  };

  const isSearching = search.trim() !== "";

  const filteredPlans = plans.filter((plan) =>
    plan.city?.toLowerCase().includes(search.toLowerCase())
  );

  const topPlans = [...plans]
    .sort((a, b) => (b.votes || 0) - (a.votes || 0))
    .slice(0, 6);

  return (
    <div className="container my-5">

      {/* TOP PLANS */}
      {!isSearching && (
        <>
          <h2 className="mb-4">Top plans</h2>

          <div className="row g-4 mb-5">
            {topPlans.map((plan) => (
              <div className="col-lg-4 col-md-6" key={plan.id}>
                <PlanCard plan={plan} />
              </div>
            ))}
          </div>
        </>
      )}

      {/* ALL PLANS */}
      <h2 id="all-plans" className="mb-4">
        {isSearching ? `Results for "${search}"` : "All plans"}
      </h2>

      {filteredPlans.length === 0 && isSearching && (
        <p className="text-muted">
          No plans found for "{search}"
        </p>
      )}

      <div className="row g-4">
        {(isSearching ? filteredPlans : plans).map((plan) => (
          <div className="col-lg-4 col-md-6" key={plan.id}>
            <PlanCard plan={plan} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
