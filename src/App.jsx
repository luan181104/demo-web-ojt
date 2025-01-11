import React from "react";
import { Provider } from "react-redux"; //Thành phần từ thư viện Redux cung cấp store Redux cho toàn bộ ứng dụng.
import { store } from "./redux/store"; //Nó chứa state toàn cục và các reducers.
import Sidebar from "./components/Sidebar";
import UserList from "./components/UserList";
import Pagination from "./components/Pagination";
import styles from "./App.module.css";
import logo from "./assets/logo.jpg";

const App = () => {
  return (
    <Provider store={store}>
      <div className={styles.app}>
        <header className={styles.header}>
          {/* Logo on the left */}
          <img src={logo} alt="Logo" className={styles.logo} />
        </header>
        <div className={styles.container}>
          <Sidebar />
          <main className={styles.main}>
            <UserList />
            <Pagination />
          </main>
        </div>
      </div>
    </Provider>
  );
};

export default App;
