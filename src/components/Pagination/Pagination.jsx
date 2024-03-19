function Pagination({ onClickNext, onClickPrev, page, pageInfo }) {
  return (
    <div>
      <button onClick={onClickPrev} disabled={page === 1}>
        Previous
      </button>
      <span>
        Page: {page}/ {pageInfo.total_pages}
      </span>
      <button onClick={onClickNext} disabled={page === pageInfo.total_pages}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
