import React from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { IoIosCloudDownload } from "react-icons/io";
import { CSVLink } from 'react-csv';

import { UserList } from "../Lib/Containers/UserListContainer";

import "./right.css";

const styles = {
  shared: {
    opacity: 1,
    verticalAlign: "middle",
    alignSelf: "center",
  },
};

const limit = 3;

export const RightComponent = (props) => {
  const { category, children, users, findUser } = props;
  const noOfPages = Math.round(users.length / limit);
  const [state, setState] = React.useState({
    limit,
    currentPage: 1,
    offset: 0,
    pages: noOfPages,
    display: 'Listitem',
    isListItem: true
  });
  const [search, setSearch] = React.useState(users);
  const inputRef = React.createRef();
  const { offset, currentPage, pages, isListItem } = state;

  const moveNext = () => {
    if (pages <= currentPage) return;
    if (pages > currentPage) {
      return setState((prevState) => ({
        ...prevState,
        currentPage: currentPage + 1,
        offset: offset + limit,
      }));
    }
  };

  const handleInputChange = () => 
    setSearch(() => findUser(inputRef.current.value, users));

  const moveBack = () => {
    if (currentPage <= 1) return;
    return setState((prevState) => ({
      ...prevState,
      currentPage: currentPage - 1,
      offset: offset - limit,
    }));
  };

  const setDisplay = () =>
    setState((prevState) => ({ ...prevState, isListItem: !isListItem }));

  React.useEffect(() => {
    setSearch(() => users);
    setState((prevState) => ({
      ...prevState,
      limit,
      currentPage: 1,
      offset: 0,
      pages: noOfPages,
    }));
  }, [users, noOfPages]);

  React.useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      pages: Math.round(search.length / limit),
    }))
  }, [search])

  return (
    <section className="Right-section">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h3 className="Heading">{isListItem ? category : 'User List'}</h3>
        <p className="filterBy">Filter by</p>
        {React.cloneElement(children, { isListItem, inputRef, handleChange: handleInputChange })}
      </div>

      <UserList
        isListItem={isListItem}
        setDisplay={setDisplay}
        result={search.slice(offset, offset + limit)}
      />

      <div className="Bottom-section">
        <CSVLink data={search}>
          <span className={`Download${!isListItem || (users.length <= 0) ? ' disabled' : ''}`}>
            <IoIosCloudDownload style={{ ...styles.shared, color: "#FFFFFF" }} />
            <span className="Download-text">Download results</span>
          </span>
        </CSVLink>
        <div>
          <div className={`Pagination angle-left${(currentPage <= 1) || (!isListItem) ? ' disabled': ''}`} onClick={moveBack}>
            <FaAngleLeft style={{ ...styles.shared, color: "#323874" }} />
          </div>
          <div className={`Pagination angle-right${(pages <= currentPage) || (!isListItem) ? ' disabled': ''}`} onClick={moveNext}>
            <FaAngleRight style={{ ...styles.shared, color: "#FFFFFF" }} />
          </div>
        </div>
      </div>
    </section>
  );
};
