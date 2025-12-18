import { useEffect, useMemo, useState } from "react";
import PlanCard from "../components/PlanCard";
import { getAllPlans } from "../services/plans.service";

const normalize = (text = "") =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

function Home({ search }) {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    getAllPlans().then(setPlans);
  }, []);

  const query = normalize(search);
  const isSearching = query.length > 0;

  const filteredPlans = useMemo(() => {
    if (!isSearching) return plans;

    return plans.filter((plan) => {
      const city = normalize(plan.city);
      const country = normalize(plan.country);
      return city.includes(query) || country.includes(query);
    });
  }, [plans, query, isSearching]);

  return (
    <div className="container my-5">
      <h2 className="mb-4">
        {isSearching ? `Results for "${search}"` : "All plans"}
      </h2>

      {isSearching && filteredPlans.length === 0 && (
        <p className="text-muted">No results found</p>
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
