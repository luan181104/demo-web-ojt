import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../redux/userSlice";
import styles from "../css/Sidebar.module.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const roles = ["dev", "ba", "qc", "pm"];
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleClick = (role) => {
    setSelectedRole(role);
    dispatch(fetchUsers({ page: 1, role }));
  };

  return (
    <div className={styles.sidebar}>
      {roles.map((role) => (
        <button
          key={role}
          onClick={() => handleRoleClick(role)}
          className={selectedRole === role ? styles.active : ""}
        >
          {role.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
