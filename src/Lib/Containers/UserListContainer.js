import React from "react";

import { UserItem } from "../Components/UserItem";
import { ViewUser } from "../Components/ViewUser";

export const UserList = ({ result = [], isListItem, setDisplay }) => {
  const [user, setUser] = React.useState({});
  const [shouldAnimate, setAnimate] = React.useState(isListItem);


  React.useEffect(() => {
    const timer = setTimeout(() => setAnimate(isListItem), 300);
    return () => clearTimeout(timer);
  }, [isListItem])

  return (
    <section className="Wrapper">
      {shouldAnimate ? (
        <section className={`UserList${!isListItem ? " AnimateUserListOut" : " AnimateUserListIn"}`}>
          {result.map((item) => (
            <UserItem
              key={item.id}
              userDetails={item}
              setUser={setUser}
              setDisplay={setDisplay}
            />
          ))}
        </section>
      ) : (
        <ViewUser
          result={user}
          setDisplay={setDisplay}
          className={isListItem ? " AnimateViewChildOut" : ""}
        />
      )}
    </section>
  );
};
