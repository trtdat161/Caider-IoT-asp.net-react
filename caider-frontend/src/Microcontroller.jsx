import axios from "axios";
import { useEffect, useState } from "react";
import "./css/addOrUp.css";
import { useNavigate } from "react-router-dom";
import { LinkPage } from "./crud/LinkPage";
import { Pagination } from "./Panigation";

export function Microcontroller() {
  /* {
    items = items,
    cntTotal = cntTotal,
    pageNumber = pageNumber,
    pageSize = pageSize,
  }; */
  const [micro, setMicro] = useState([]);
  const [pageNumber, setPageNumber] = useState(1); // mặc định trang đầu
  const [totalPages, setTotalPages] = useState(0);
  //-----------------------------------------------
  const [loadError, setLoadError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const data = async (page = 1) => {
    try {
      const response = await axios.get(
        `/api/microcontrollers?pageNumber=${page}`
      );
      console.log(response.data); // debug

      const result = response.data;
      setMicro(result.items || []); // hiển thị danh sách item
      setTotalPages(Math.ceil(result.cntTotal / result.pageSize)); // Tính tổng số trang
      // Cập nhật trang hiện tại (nếu backend trả về khác)
      setPageNumber(result.pageNumber);
      setLoadError("");
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setLoadError("Lỗi khi lấy dữ liệu microcontrol: " + error.message);
      setMicro([]);
    }
  };

  // delete
  const deletes = async (id) => {
    try {
      await axios.delete(`/api/microcontrollers/${id}`);
      setMicro(micro.filter((item) => item.id !== id));
      setDeleteError("");
      console.log("Xóa ok:");
    } catch (error) {
      console.error("Lỗi khi xóa dữ liệu:", error);
      setDeleteError("Lỗi khi xóa dữ liệu microcontroller: " + error.message);
    }
  };

  const filteMicro = micro.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    data(pageNumber);
  }, [pageNumber]);

  return (
    <>
      <LinkPage />
      {loadError && (
        <div className="alert alert-danger text-center" role="alert">
          {loadError}
        </div>
      )}
      {deleteError && (
        <div className="alert alert-danger text-center" role="alert">
          {deleteError}
        </div>
      )}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1 className="text-light ms-2 fw-bold">Dashboard Microcontroller</h1>
        <button
          className="m-2 btn btn-primary fw-medium"
          onClick={() => navigate("/manage/add-or-up-microcontroller")}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Microcontroller
        </button>
      </div>
      {/* search */}
      <div className="mb-4 d-flex justify-content-end align-items-center me-2">
        <div className="position-relative">
          <input
            type="text"
            id="search"
            className="form-control rounded-pill pe-5 shadow-sm border-0"
            placeholder="Search microcontroller..."
            style={{ width: "350px", height: "48px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-4 text-primary fs-4"></i>
        </div>
      </div>

      <div className="table-responsive table-bordered rounded-3 bg-light p-2 m-2 parent">
        <table className="table table-hover align-middle mb-0 ">
          <thead className="table-dark">
            <tr>
              <th className="text-center fw-bold">no</th>
              <th className="text-center fw-bold">microcontrol</th>
              <th className="text-center fw-bold">note</th>
              <th colSpan={2} className="text-center fw-bold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteMicro.map((item, index) => {
              return (
                <>
                  <tr key={item.id}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{item.name}</td>
                    <td className="text-center">
                      {item.note ? item.note : "No note"}
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-danger"
                        onClick={() => deletes(item.id)} // dùng => để khi ấn mới xóa
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          navigate(
                            `/manage/add-or-up-microcontroller/${item.id}`
                          )
                        }
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
        <Pagination
          currentPage={pageNumber}
          totalPage={totalPages}
          onPageChange={setPageNumber}
        />
      </div>
    </>
  );
}
