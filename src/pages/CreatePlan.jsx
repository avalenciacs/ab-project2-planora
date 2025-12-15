import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPlan } from "../services/plans.service";

function CreatePlan() {
  const navigate = useNavigate();

  // campos base
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coverImg, setCoverImg] = useState("");

  // arrays dinámicos
  const [experiencias, setExperiencias] = useState([{ title: "", text: "" }]);
  const [lugaresParaComer, setLugaresParaComer] = useState([
    { name: "", img: "", note: "" },
  ]);

  // UI estado
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // helpers: experiencias
  const addExperience = () =>
    setExperiencias((prev) => [...prev, { title: "", text: "" }]);

  const removeExperience = (index) =>
    setExperiencias((prev) => prev.filter((_, i) => i !== index));

  const updateExperience = (index, field, value) => {
    setExperiencias((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  // helpers: lugares
  const addPlace = () =>
    setLugaresParaComer((prev) => [...prev, { name: "", img: "", note: "" }]);

  const removePlace = (index) =>
    setLugaresParaComer((prev) => prev.filter((_, i) => i !== index));

  const updatePlace = (index, field, value) => {
    setLugaresParaComer((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // limpieza: quitamos filas vacías
    const cleanExperiencias = experiencias
      .map((x) => ({ title: x.title.trim(), text: x.text.trim() }))
      .filter((x) => x.title && x.text);

    const cleanLugares = lugaresParaComer
      .map((x) => ({
        name: x.name.trim(),
        img: x.img.trim(),
        note: x.note.trim(),
      }))
      .filter((x) => x.name && x.img && x.note);

    if (!name.trim() || !description.trim() || !coverImg.trim()) {
      setError("Completa Name, Description y Cover image URL.");
      return;
    }

    const newPlan = {
      name: name.trim(),
      description: description.trim(),
      coverImg: coverImg.trim(),
      experiencias: cleanExperiencias,
      lugaresParaComer: cleanLugares,
    };

    try {
      setSaving(true);
      const createdId = await createPlan(newPlan);
      // ir al details del nuevo plan
      navigate(`/plans/${createdId}`);
    } catch (err) {
      console.error(err);
      setError("Error creando el plan (revisa consola / permisos Firebase).");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: 980 }}>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="m-0">Create a plan</h2>
        <span className="badge text-bg-light border">Planora</span>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="card shadow-sm border-0">
        <div className="card-body p-4">
          {/* Básico */}
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                placeholder="Asturias"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Cover image URL (coverImg)</label>
              <input
                className="form-control"
                placeholder="https://..."
                value={coverImg}
                onChange={(e) => setCoverImg(e.target.value)}
                required
              />
              {coverImg.trim() && (
                <div className="mt-2">
                  <img
                    src={coverImg}
                    alt="preview"
                    className="img-fluid rounded"
                    style={{ maxHeight: 180, width: "100%", objectFit: "cover" }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    onLoad={(e) => {
                      e.currentTarget.style.display = "block";
                    }}
                  />
                </div>
              )}
            </div>

            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Naturaleza, comida, planes..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>

          <hr className="my-4" />

          {/* EXPERIENCIAS */}
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h5 className="m-0">Experiences</h5>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={addExperience}
            >
              + Add experience
            </button>
          </div>

          <div className="row g-3">
            {experiencias.map((exp, idx) => (
              <div className="col-12" key={idx}>
                <div className="card border-0 bg-light">
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label className="form-label">Title</label>
                        <input
                          className="form-control"
                          placeholder="Lagos de Covadonga"
                          value={exp.title}
                          onChange={(e) =>
                            updateExperience(idx, "title", e.target.value)
                          }
                        />
                      </div>

                      <div className="col-md-7">
                        <label className="form-label">Text</label>
                        <input
                          className="form-control"
                          placeholder="Paisaje de montaña espectacular..."
                          value={exp.text}
                          onChange={(e) =>
                            updateExperience(idx, "text", e.target.value)
                          }
                        />
                      </div>

                      <div className="col-md-1 d-flex align-items-end">
                        <button
                          type="button"
                          className="btn btn-outline-danger w-100"
                          onClick={() => removeExperience(idx)}
                          disabled={experiencias.length === 1}
                          title="Remove"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                    <small className="text-muted d-block mt-2">
                      Se guardan solo las filas completas.
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          {/* LUGARES PARA COMER */}
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h5 className="m-0">Places to eat</h5>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={addPlace}
            >
              + Add place
            </button>
          </div>

          <div className="row g-3">
            {lugaresParaComer.map((p, idx) => (
              <div className="col-12" key={idx}>
                <div className="card border-0 bg-light">
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-md-3">
                        <label className="form-label">Name</label>
                        <input
                          className="form-control"
                          placeholder="Sidrería Tierra Astur"
                          value={p.name}
                          onChange={(e) =>
                            updatePlace(idx, "name", e.target.value)
                          }
                        />
                      </div>

                      <div className="col-md-5">
                        <label className="form-label">Image URL (img)</label>
                        <input
                          className="form-control"
                          placeholder="https://..."
                          value={p.img}
                          onChange={(e) =>
                            updatePlace(idx, "img", e.target.value)
                          }
                        />
                      </div>

                      <div className="col-md-3">
                        <label className="form-label">Note</label>
                        <input
                          className="form-control"
                          placeholder="cocina tradicional"
                          value={p.note}
                          onChange={(e) =>
                            updatePlace(idx, "note", e.target.value)
                          }
                        />
                      </div>

                      <div className="col-md-1 d-flex align-items-end">
                        <button
                          type="button"
                          className="btn btn-outline-danger w-100"
                          onClick={() => removePlace(idx)}
                          disabled={lugaresParaComer.length === 1}
                          title="Remove"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    {p.img.trim() && (
                      <div className="mt-3">
                        <img
                          src={p.img}
                          alt="place preview"
                          className="img-fluid rounded"
                          style={{
                            maxHeight: 160,
                            width: "100%",
                            objectFit: "cover",
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                          onLoad={(e) => {
                            e.currentTarget.style.display = "block";
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          <div className="d-flex gap-2 justify-content-end">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? "Creating..." : "Create plan"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreatePlan;
