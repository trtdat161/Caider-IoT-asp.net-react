// cần 3 tham số cho props trang trước/sau/set số trang
export function Pagination({ currentPage, totalPage, onPageChange }) {
  if (totalPage <= 1) return null;

  return (
    <>
      (
      <div className="d-flex justify-content-center align-items-center mt-5 mb-4 gap-4">
        <button
          className="btn btn-outline-primary px-4"
          onClick={() => onPageChange(currentPage - 1)} // đag ử trang 1 ko thể tiến
          disabled={currentPage === 1}
        >
          « Previous
        </button>

        <span className="fw-bold fs-5 text-primary">
          page {currentPage} / {totalPage}
        </span>

        <button
          className="btn btn-outline-primary px-4"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPage} // đag ở trang cuối ko thể lùi
        >
          Next »
        </button>
      </div>
      )
    </>
  );
}
