import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../redux/userSlice";
import styles from "../css/Pagination.module.css";

const Pagination = ({ role, gender }) => {
  const dispatch = useDispatch();
  const [selectedPage, setSelectedPage] = useState(null);

  const handlePageClick = (page) => {
    setSelectedPage(page);
    dispatch(fetchUsers({ page, role, gender }));
  };

  return (
    <div className={styles.pagination}>
      {[1, 2, 3, 4, 5].map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={selectedPage === page ? styles.active : ""}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
