import React from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../redux/userSlice";
import styles from "../css/Pagination.module.css";

const Pagination = ({ role, gender }) => {
  const dispatch = useDispatch();

  const handlePageClick = (page) => {
    dispatch(fetchUsers({ page, role, gender }));
  };

  return (
    <div className={styles.pagination}>
      {[1, 2, 3].map((page) => (
        <button key={page} onClick={() => handlePageClick(page)}>
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
