import { db } from "../config/firebase";
import {
  ref,
  push,
  get,
  child,
  update,
  remove,
} from "firebase/database";

/* CREATE */
export const createPlan = async (planData) => {
  const plansRef = ref(db, "places");
  const newPlanRef = push(plansRef);
  await update(newPlanRef, planData);
  return newPlanRef.key;
};

/* GET ALL */
export const getAllPlans = async () => {
  const snapshot = await get(child(ref(db), "places"));
  if (!snapshot.exists()) return [];

  return Object.entries(snapshot.val()).map(([id, plan]) => ({
    id,
    ...plan,
  }));
};

/* GET BY ID */
export const getPlanById = async (id) => {
  const snapshot = await get(child(ref(db), `places/${id}`));
  if (!snapshot.exists()) return null;
  return snapshot.val();
};

/* UPDATE */
export const updatePlan = async (id, data) => {
  await update(ref(db, `places/${id}`), data);
};

/* DELETE */
export const deletePlan = async (id) => {
  await remove(ref(db, `places/${id}`));
};
