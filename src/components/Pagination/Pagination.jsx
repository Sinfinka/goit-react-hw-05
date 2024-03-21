import css from "./Pagination.module.css";

function Pagination({ onClickNext, onClickPrev, page, pageInfo }) {
  const handleNextClick = () => {
    onClickNext();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={css.pagination}>
      <button onClick={onClickPrev} disabled={page === 1}>
        Previous
      </button>
      <span className={css.page}>
        Page: {page}/ {pageInfo.total_pages}
      </span>
      <button
        onClick={handleNextClick}
        disabled={page === pageInfo.total_pages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
