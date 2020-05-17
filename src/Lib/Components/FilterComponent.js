import React from "react";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

const style = {
  color: "#30BBB5",
  fontSize: "35px",
  cursor: "pointer",
  position: 'relative',
  top: 12,
};

export const FilterComponent = (props) => {
  const {
    countries = [],
    showCountry,
    setShowCountry,
    filterByCountry,
    inputRef,
    handleChange,
    isListItem,
  } = props;

  const handleSelect = (event) => {
    const value = event.target.value;
    if (value === 'Country') return;
    if (value) {
      return filterByCountry(event.target.value);
    }
  };

  return (
    <section className="Filter-container">
      <label htmlFor="search">
        <IoIosSearch
          style={{
            cursor: "pointer",
            fontSize: "25px",
            position: "relative",
            top: 9,
            left: 15,
            color: 'rgba(38, 42, 65, .52)',
            opacity: 1,
          }}
        />
        <input
          id="search"
          ref={inputRef}
          name="user-search"
          className="form-control"
          aria-label="Search user"
          placeholder="Find in list"
          onChange={handleChange}
        />
      </label>
      <div className="Dropdown">
        <select
          name="select-country"
          className="Select-options"
          placeholder="Select Country"
          onChange={handleSelect}
          disabled={!showCountry || !isListItem}
          style={{ cursor: !showCountry || !isListItem ? 'not-allowed' : 'pointer' }}
        >
          <option value="Country">Country</option>
          {countries.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <span className="Show-country">
        {!showCountry ? (
          <FaToggleOff style={style} onClick={setShowCountry} />
        ) : (
          <FaToggleOn style={style} onClick={setShowCountry} />
        )}
        <b>Show Country</b>
      </span>
    </section>
  );
};
