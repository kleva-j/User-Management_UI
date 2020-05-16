import React from "react";
import { FaSearch } from "react-icons/fa";
import "./left.css";

export const LeftComponent = ({ findUser, children }) => {
  const inputRef = React.createRef();
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      return findUser(inputRef.current.value);
    }
    return;
  };
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
            onKeyPress={handleKeyPress}
            className="form-control"
          />
          <FaSearch style={{ position: "relative", left: -580, top: 10 }} />
        </aside>
        <aside className="Bottom-section">
          <h6 className="Show-users">Show Users</h6>
          {children}
        </aside>
      </article>
    </section>
  );
};
