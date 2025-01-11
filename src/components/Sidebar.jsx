import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../redux/userSlice";
import styles from "../css/Sidebar.module.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const roles = ["dev", "ba", "qc", "pm"];
  const [selectedRole, setSelectedRole] = useState(null); // Trạng thái lưu role đang chọn

  const handleRoleClick = (role) => {
    setSelectedRole(role); // Cập nhật role đang chọn
    dispatch(fetchUsers({ page: 1, role })); // Gửi yêu cầu fetch users theo role
  };

  return (
    <div className={styles.sidebar}>
      {roles.map((role) => (
        <button
          key={role}
          onClick={() => handleRoleClick(role)}
          className={selectedRole === role ? styles.active : ""} // Thêm class active nếu được chọn
        >
          {role.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
