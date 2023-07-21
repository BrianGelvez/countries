import './pagination.modules.css'


const Pagination = ({ pageNumber, totalPages, navigate }) => {
  const firstPage = 1;
  const lastPage = totalPages;

  const goToPage = (page) => {
    navigate(`/home/${page}`);
  };

  const nextPage = () => {
    const nextPageNumber = pageNumber + 1;
    if (nextPageNumber <= lastPage) {
      navigate(`/home/${nextPageNumber}`);
    }
  };

  const previousPage = () => {
    const previousPageNumber = pageNumber - 1;
    if (previousPageNumber >= firstPage) {
      navigate(`/home/${previousPageNumber}`);
    }
  };

  const renderPageButtons = () => {
  
    const buttons = []

    for (let i = firstPage; i <= lastPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={pageNumber === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="pagination">
      <button className="previous" onClick={previousPage}>
        Previous
      </button>
      {renderPageButtons()}
      <button className="next" onClick={nextPage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
