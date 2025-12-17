import { useEffect, useState } from "react";
import PlanCard from "../components/PlanCard";
import { getAllPlans } from "../services/plans.service";

/*  Normalizar texto (acentos, mayúsculas) */
const normalizeText = (text = "") => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

function Home({ search }) {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    const data = await getAllPlans();
    setPlans(data);
  };

  const query = normalizeText(search);
  const isSearching = query !== "";

  /*  Filtrado por ciudad O país (sin acentos) */
  const filteredPlans = plans.filter((plan) => {
    const city = normalizeText(plan.city);
    const country = normalizeText(plan.country);

    return city.includes(query) || country.includes(query);
  });

  /*  Top plans por votos */
  const topPlans = [...plans]
    .sort((a, b) => (b.votes || 0) - (a.votes || 0))
    .slice(0, 6);

  return (
    <div className="container my-5">

      {/*  TOP PLANS (solo si NO se está buscando) */}
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

      {/*  ALL / RESULTS */}
      <h2 id="all-plans" className="mb-4">
        {isSearching ? `Results for "${search}"` : "All plans"}
      </h2>

      {/*  No results */}
      {isSearching && filteredPlans.length === 0 && (
        <p className="text-muted">
          No plans found for "{search}"
        </p>
      )}

      {/*  Plans list */}
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
