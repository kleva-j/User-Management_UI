import React from "react";

export const ButtonContainer = (props) => {
  const { categories, currentCategory, children } = props;

  return (
    <section className="Button-container">
      {categories.map((item) => {
        const name = item.split(" ")[0].toLowerCase(),
          classlist =
            currentCategory === item
              ? `Button ${name} active`
              : `Button ${name}`;
        return React.cloneElement(children, {
          key: name,
          name,
          classlist,
          item,
        });
      })}
    </section>
  );
};
