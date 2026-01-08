import { Link } from "react-router-dom";

export function LinkPage() {
  return (
    <>
      <div className="mt-2 mb-4 ms-2">
        <nav aria-label="breadcrumb ">
          <ul
            //   breadcrumb bootstraop chính dàn ngang
            className="breadcrumb bg-transparent p-3 rounded-3 shadow-sm"
            style={{
              background: "rgba(13, 110, 253, 0.1)",
              backdropFilter: "blur(10px)",
              border: "1.2px solid rgba(207, 207, 207, 1)",
              width: "fit-content",
            }}
          >
            <li className="breadcrumb-item">
              <Link
                to="/"
                className="text-primary text-decoration-none fw-semibold"
              >
                <i className="bi bi-house-door-fill me-2"></i>Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link
                to="/manage"
                className="text-info text-decoration-none fw-semibold"
              >
                <i className="bi bi-robot me-2"></i>Dashboard
              </Link>
            </li>
            <li
              className="breadcrumb-item active fw-bold text-light"
              aria-current="page"
            >
              <i className="bi bi-x-circle-fill me-2"></i>Cancel
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
