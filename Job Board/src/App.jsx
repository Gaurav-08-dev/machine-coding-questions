/* eslint-disable react/prop-types */
import { useEffect } from "react";
import "./App.css";
import { useState } from "react";

const PAGE_SIZE = 6;

function JobComponent({ title, by, time, url, }) {
  const formattedTime = new Date(time * 1000).toLocaleString();

  return (
    <div className="custom-post" role="listitem">
    <h2 className="custom-post__title">
      <a
        className={url ? "" : "inactiveLink"}
        href={url}
        target="_blank"
        rel="noopener" // security for opening new pages - Explain this indepth
      >
        {title}
      </a>
    </h2>
    <span className="custom-post__metadata">
      By {by} · {formattedTime}
    </span>
  </div>
  );
}
function App() {
  const [jobIds, setJobIds] = useState([]);
  const [jobitem, setJobItems] = useState([]);
  const [isJobDetailsLoading, setIsJobDetailsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchJobs = async (currPage) => {
    setCurrentPage(currPage);
    setIsJobDetailsLoading(true);

    let itemsList = jobIds;
    if (!itemsList.length) {
      const response = await fetch(
        "https://hacker-news.firebaseio.com/v0/jobstories.json"
      );
      const result = await response.json();
      itemsList = result;
      setJobIds(result);
    }
    const jobIdsForPage = itemsList.slice(
      currPage * PAGE_SIZE,
      currPage * PAGE_SIZE + PAGE_SIZE
    );

    const itemsForPage = await Promise.all(
      jobIdsForPage.map((id) =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
          (res) => res.json()
        )
      )
    );
    

    setJobItems([...jobitem, ...itemsForPage]);
    setIsJobDetailsLoading(false);
  };

  const loadMore = () => {
    fetchJobs(currentPage + 1);
  };

  useEffect(() => {
    if (currentPage === 0) fetchJobs(currentPage);
  }, [currentPage]);

  return (
    <>
      <h3>Hacker News Job Board</h3>
      {!jobitem.length || !jobIds.length ? (
        <h4>Loading...</h4>
      ) : (
        jobitem.map((item) => <JobComponent key={item.id} {...item} />)
      )}

      {(jobitem.length > 0 && currentPage * PAGE_SIZE + PAGE_SIZE < jobIds.length) && <button disabled={isJobDetailsLoading} onClick={() => loadMore()}>{isJobDetailsLoading?"Loading":"LoadMore"}</button>}
    </>
  );
}

export default App;
