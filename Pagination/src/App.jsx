import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [productsList, setProductsList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage,setTotalPage] = useState(0)

  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();

    if (data && data.products) {
      setProductsList(data.products);
      setTotalPage(data.total / 10)
    }
  };

  const handlePagination = (pageNo) => {
    // productsList.length / 10
    if (pageNo >= 1 && pageNo <= totalPage  && pageNo !== page)
      setPage(pageNo);
  };
  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div className="App">
      {productsList.length > 0 && (
        <div className="products">
        {/* .slice(page * 10 - 10, page * 10) */}
          {productsList.map((item) => {
            return (
              <span key={item.id} className="products__single">
                <img src={item.thumbnail} alt={item.title} />
                <span>{item.title}</span>
              </span>
            );
          })}
        </div>
      )}

      {/* <div className="footer">
          <button onClick={page > 0 ? () => setPage(page - 1) : () => {}}>
          prev
        </button>
        <span>{page}</span>
        <button onClick={page < 10 ? () => setPage(page + 1) : () => {}}>
          next
        </button>
        </div> */}
      {productsList.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination__disabled"}
            onClick={() => handlePagination(page - 1)}
          >
            &lt;
          </span>
          {/* productsList.length / 10 */}
          {[...Array(totalPage)].map((_, i) => {
            return (
              <span
                key={i}
                className={i + 1 === page ? "pagination__selected" : ""}
                onClick={() => handlePagination(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}

          <span
            className={
              page < productsList.length / 10 ? "" : "pagination__disabled"
            }
            onClick={() => handlePagination(page + 1)}
          >
            &gt;
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
