import { Link } from "react-router-dom";
import logo from "../assets/logo2.png";

const slides = [
  {
    type: "Food",
    title: "Foodie weekend in Bilbao",
    subtitle: "Real food routes shared by locals",
    img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
  },
  {
    type: "Culture",
    title: "The Cultural Salamanca",
    subtitle: "History, legends and tradition",
    img: "https://static.booking.weekendesk.fr/image_cache/A977000/977702/977702_640_360_FSImage_1_EDIT_destination.jpg",
  },
  {
    type: "Nature",
    title: "Nature escape in Asturias",
    subtitle: "Mountains, coast and green landscapes",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  },
  {
    type: "Experience",
    title: "Urban experiences in Málaga",
    subtitle: "Explore Málaga on a tuk tuk tour",
    img: "https://images.myguide-cdn.com/malaga/companies/malaga-2-hour-tuktuki-tour-private-deluxe-experience/large/malaga-2-hour-tuktuki-tour-private-deluxe-experience-4827104.jpg",
  },
  {
    type: "Nightlife",
    title: "Nightlife in Barcelona",
    subtitle: "Music, bars and city energy",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
  },
];

function Landing() {
  return (
    <div>
      {/* ================= HERO ================= */}
      <section className="text-center py-5">
        <img
          src={logo}
          alt="Planora logo"
          style={{ height: "80px" }}
          className="mb-3"
        />

        <h1 className="fw-bold mb-2">
          Discover real travel plans
        </h1>

        <p className="text-muted mb-4">
          Explore authentic experiences created by travelers, not algorithms.
        </p>

        <Link to="/home" className="btn btn-dark px-4 mb-3">
          Explore plans
        </Link>

        {/* LOGIN VALUE */}
        <div className="mt-3">
          <p className="fw-semibold mb-1">
            Travel is better when it’s shared.
          </p>

          <p className="text-muted small mb-0">
            Log in to create your own plans, like authentic routes and inspire
            travelers around the world.
          </p>
        </div>
      </section>

      {/* ================= CAROUSEL ================= */}
      <section className="container my-5">
        <div
          id="plansCarousel"
          className="carousel slide shadow rounded overflow-hidden"
          data-bs-ride="carousel"
          data-bs-interval="4000"
        >
          <div className="carousel-inner">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={slide.img}
                  className="d-block w-100"
                  alt={slide.title}
                  style={{ height: "420px", objectFit: "cover" }}
                />

                <div className="bg-white text-center p-3">
                  <span className="badge bg-secondary mb-2">
                    {slide.type}
                  </span>

                  <h5 className="mb-1">{slide.title}</h5>

                  <p className="text-muted mb-0">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CONTROLS */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#plansCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" />
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#plansCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" />
          </button>
        </div>

        {/* FOOTER LINE */}
        <p className="text-center text-muted mt-4">
          Discover real plans · Travel like a local
        </p>
      </section>
    </div>
  );
}

export default Landing;
