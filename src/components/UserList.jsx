import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../css/UserList.module.css";

const UserList = () => {
  const users = useSelector((state) => state.user.users);
  const status = useSelector((state) => state.user.status);

  const [filterText, setFilterText] = useState("");
  const [genderFilter, setGenderFilter] = useState("all"); // Lọc giới tính
  const [countryFilter, setCountryFilter] = useState("all"); // Lọc quốc gia
  const [ageRange, setAgeRange] = useState([0, 100]); // Lọc độ tuổi

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Failed to fetch users.</p>;

  // Filter users based on text, gender, country, and age range
  const filteredUsers = users.filter((user) => {
    const matchesText =
      user.name.first.toLowerCase().includes(filterText.toLowerCase()) ||
      user.name.last.toLowerCase().includes(filterText.toLowerCase());

    const matchesGender =
      genderFilter === "all" || user.gender === genderFilter;

    const matchesCountry =
      countryFilter === "all" || user.location.country === countryFilter;

    const userAge = user.dob.age;
    const matchesAge = userAge >= ageRange[0] && userAge <= ageRange[1];

    return matchesText && matchesGender && matchesCountry && matchesAge;
  });

  return (
    <div>
      {/* Filter Controls */}
      <div className={styles.filterControls}>
        {/* Search Filter */}
        <label>Filter:</label>
        <input
          type="text"
          placeholder="Search by name"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className={styles.filterInput}
        />

        {/* Gender Filter */}
        <div className={styles.genderFilter}>
          <button
            className={`${styles.genderButton} ${
              genderFilter === "all" ? styles.active : ""
            }`}
            onClick={() => setGenderFilter("all")}
          >
            All
          </button>
          <button
            className={`${styles.genderButton} ${
              genderFilter === "male" ? styles.active : ""
            }`}
            onClick={() => setGenderFilter("male")}
          >
            Male
          </button>
          <button
            className={`${styles.genderButton} ${
              genderFilter === "female" ? styles.active : ""
            }`}
            onClick={() => setGenderFilter("female")}
          >
            Female
          </button>
        </div>

        {/* Country Filter */}
        <select
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          className={styles.countryFilter}
        >
          <option value="all">All Countries</option>
          {[...new Set(users.map((user) => user.location.country))].map(
            (country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            )
          )}
        </select>

        {/* Age Filter */}
        <div className={styles.ageFilter}>
          <label>
            Age Range:
            <input
              type="number"
              value={ageRange[0]}
              onChange={(e) =>
                setAgeRange([Number(e.target.value), ageRange[1]])
              }
              placeholder="Min Age"
            />
            -
            <input
              type="number"
              value={ageRange[1]}
              onChange={(e) =>
                setAgeRange([ageRange[0], Number(e.target.value)])
              }
              placeholder="Max Age"
            />
          </label>
        </div>
      </div>

      {/* Filtered User List */}
      <div className={styles.userList}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <div key={index} className={styles.userCard}>
              <img src={user.picture.thumbnail} alt={user.name.first} />
              <p>{`${user.name.first} ${user.name.last}`}</p>
              <p>{user.email}</p>
              <p>{user.gender}</p>
              <p>{user.location.country}</p>
              <p>{user.dob.age} years old</p>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default UserList;
