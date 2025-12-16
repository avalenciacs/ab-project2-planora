import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL =
  "https://planora-a08d1-default-rtdb.europe-west1.firebasedatabase.app/places";

const ACTIVITY_TYPES = [
  "food",
  "experience",
  "culture",
  "nature",
  "nightlife",
];

function CreatePlan() {
  const navigate = useNavigate();

  // PLAN INFO
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [description, setDescription] = useState("");

  // ACTIVITIES
  const [activities, setActivities] = useState([]);

  const addActivity = () => {
    setActivities([
      ...activities,
      { type: "", title: "", description: "", img: "" },
    ]);
  };

  const updateActivity = (index, field, value) => {
    const copy = [...activities];
    copy[index][field] = value;
    setActivities(copy);
  };

  const removeActivity = (index) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1️⃣ Create plan
    const planResponse = await axios.post(`${BASE_URL}.json`, {
      name,
      country,
      city: city.toLowerCase(),
      coverImg,
      description,
      votes: 0,
    });

    const planId = planResponse.data.name;

    // 2️⃣ Create activities
    for (let activity of activities) {
      await axios.post(
        `${BASE_URL}/${planId}/actividades.json`,
        activity
      );
    }

    // 3️⃣ Go to details
    navigate(`/plans/${planId}`);
  };

  return (
    <div className="container my-5">
      <h2>Create a new plan</h2>

      <form onSubmit={handleSubmit} className="mt-4">

        {/* BASIC INFO */}
        <input
          className="form-control mb-3"
          placeholder="Plan name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="form-control mb-3"
          placeholder="Country (e.g. Spain)"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />

        <input
          className="form-control mb-3"
          placeholder="City (e.g. Salamanca)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />

        <input
          className="form-control mb-3"
          placeholder="Cover image URL"
          value={coverImg}
          onChange={(e) => setCoverImg(e.target.value)}
          required
        />

        <textarea
          className="form-control mb-4"
          placeholder="Plan description"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <hr />

        {/* ACTIVITIES */}
        <h4>Activities</h4>

        {activities.map((activity, index) => (
          <div key={index} className="card p-3 mb-3">

            <select
              className="form-select mb-2"
              value={activity.type}
              onChange={(e) =>
                updateActivity(index, "type", e.target.value)
              }
              required
            >
              <option value="">Select type</option>
              {ACTIVITY_TYPES.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <input
              className="form-control mb-2"
              placeholder="Activity title"
              value={activity.title}
              onChange={(e) =>
                updateActivity(index, "title", e.target.value)
              }
              required
            />

            <textarea
              className="form-control mb-2"
              placeholder="Activity description"
              rows="2"
              value={activity.description}
              onChange={(e) =>
                updateActivity(index, "description", e.target.value)
              }
              required
            />

            <input
              className="form-control mb-2"
              placeholder="Image URL (optional)"
              value={activity.img}
              onChange={(e) =>
                updateActivity(index, "img", e.target.value)
              }
            />

            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => removeActivity(index)}
            >
              Remove activity
            </button>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-outline-secondary mb-4"
          onClick={addActivity}
        >
          + Add activity
        </button>

        <hr />

        <button className="btn btn-primary w-100">
          Create plan
        </button>
      </form>
    </div>
  );
}

export default CreatePlan;
