import { useEffect, useState } from "react";
import PlanCard from "../components/PlanCard";
import { getAllPlans } from "../services/plans.service";

function Home() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    const data = await getAllPlans();
    setPlans(data);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Discover real travel plans</h2>

      <div className="row g-4">
        {plans.map((plan) => (
          <div className="col-lg-4 col-md-6 col-sm-12" key={plan.id}>
            <PlanCard plan={plan} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
