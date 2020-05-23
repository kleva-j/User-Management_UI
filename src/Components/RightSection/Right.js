import React from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { IoIosCloudDownload } from "react-icons/io";
import { CSVLink } from "react-csv";

import { UserList } from "../../Lib/Containers/UserListContainer";

import "./right.css";

const styles = {
  shared: {
    opacity: 1,
    verticalAlign: "middle",
    alignSelf: "center",
  },
  flexItem: { display: "flex", flexDirection: "column" }
};

const limit = 3;

export const RightComponent = React.memo((props) => {
  const { category, children, users, findUser, filterByCountry } = props;
  const [search, setSearch] = React.useState(users);
  const noOfPages = Math.round(search.length / limit);

  const [state, setState] = React.useState({
    limit,
    currentPage: 1,
    offset: 0,
    pages: noOfPages,
    display: "Listitem",
    isListItem: true,
    showCountry: true,
  });

  const inputRef = React.createRef();

  const { offset, currentPage, pages, isListItem, showCountry } = state;

  const moveNext = React.useCallback(() => {
    if (pages <= currentPage) return;
    if (pages > currentPage) {
      return setState((prevState) => ({
        ...prevState,
        currentPage: currentPage + 1,
        offset: offset + limit,
      }));
    }
  }, [currentPage, offset, pages]);

  const handleChange = React.useCallback(
    () => setSearch(() => findUser(inputRef.current.value, users)),
    [findUser, inputRef, users]
  );

  const moveBack = React.useCallback(() => {
    if (currentPage <= 1) return;
    return setState((prevState) => ({
      ...prevState,
      currentPage: currentPage - 1,
      offset: offset - limit,
    }));
  }, [currentPage, offset]);

  const setShowCountry = React.useCallback(
    () => setState((prevState) => ({ ...prevState, showCountry: !showCountry })),
    [showCountry]
  );

  const setDisplay = React.useCallback(
    () => setState((prevState) => ({ ...prevState, isListItem: !isListItem })),
    [isListItem]
  );

  const setResultByCountry = React.useCallback(
    (value) => setSearch(() => filterByCountry(users)(value)),
    [users, filterByCountry]
  );

  React.useEffect(() => {
    setSearch(() => users);
  }, [users]);

  React.useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      limit,
      currentPage: 1,
      offset: 0,
      pages: noOfPages,
    }));
  }, [search, noOfPages]);

  return (
    <section className="Right-section">
      <div style={styles.flexItem}>
        <h3 className="Heading">{isListItem ? category : "User List"}</h3>
        <p className="filterBy">Filter by</p>
        {React.cloneElement(children, {
          isListItem,
          inputRef,
          showCountry,
          setShowCountry,
          handleChange,
          filterByCountry: setResultByCountry,
        })}
      </div>

      <UserList
        isListItem={isListItem}
        setDisplay={setDisplay}
        result={search.slice(offset, offset + limit)}
      />

      <div className="Bottom-section">
        <CSVLink data={search}>
          <span
            className={`Download${
              !isListItem || users.length <= 0 ? " disabled" : ""
            }`}
          >
            <IoIosCloudDownload
              style={{ ...styles.shared, color: "#FFFFFF" }}
            />
            <span className="Download-text">Download results</span>
          </span>
        </CSVLink>
        <div>
          <div
            className={`Pagination angle-left${
              currentPage <= 1 || !isListItem ? " disabled" : ""
            }`}
            onClick={moveBack}
          >
            <FaAngleLeft style={{ ...styles.shared, color: "#323874" }} />
          </div>
          <div
            className={`Pagination angle-right${
              pages <= currentPage || !isListItem ? " disabled" : ""
            }`}
            onClick={moveNext}
          >
            <FaAngleRight style={{ ...styles.shared, color: "#FFFFFF" }} />
          </div>
        </div>
      </div>
    </section>
  );
});
