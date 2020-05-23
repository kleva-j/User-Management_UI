import React from "react";
import { FaSearch } from "react-icons/fa";
import "./left.css";

const styles = {
  searchIcon: { position: "relative", left: -580, top: 10 } 
};

export const LeftComponent = React.memo(({ findUser, children }) => {
  const inputRef = React.createRef();

  const handlePress = React.useCallback((event) => {
    if (event.key === "Enter") {
      findUser(inputRef.current.value);
    }
  }, [inputRef, findUser]);

  return (
    <section className="Left-section">
      <article className="container">
        <aside className="Top-section">
          <div>
            <span className="greeting">Hello, </span>
            <span className="name">Emerald</span>
          </div>
          <p className="paragraph">
            Welcome to your dashboard, kindly sort through the user base
          </p>
          <input
            type="text"
            ref={inputRef}
            placeholder="Find a user"
            onKeyPress={handlePress}
            className="form-control"
          />
          <FaSearch style={styles.searchIcon} />
        </aside>
        <aside className="Bottom-section">
          <h6 className="Show-users">Show Users</h6>
          {children}
        </aside>
      </article>
    </section>
  );
});
