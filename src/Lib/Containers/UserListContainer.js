import React, { useRef } from "react";
import { Switch, Route } from "react-router-dom";

import { UserItem } from "../Components/UserItem";
import { ViewUser } from "../Components/ViewUser";

export const UserList = React.memo(({ result = [], isListItem, setDisplay }) => {
  const [user, setUser] = React.useState({});
  const [shouldAnimate, setAnimate] = React.useState(isListItem);
  const animateRef = useRef(shouldAnimate);
  animateRef.current = isListItem;

  const setCurrentDisplay = React.useCallback(setDisplay, [setDisplay]);

  React.useEffect(() => {
    const timer = setTimeout(() => setAnimate(animateRef.current), 300);
    return () => clearTimeout(timer);
  }, [isListItem]);

  return (
    <section className="Wrapper">
      <Switch>
        <Route>
          <section
            className={`UserList${
              !isListItem ? " AnimateUserListOut" : " AnimateUserListIn"
            }`}
          >
            {result.map((item) => (
              <UserItem
                key={item.id}
                setUser={setUser}
                userDetails={item}
                setDisplay={setCurrentDisplay}
              />
            ))}
          </section>
        </Route>

        <Route exact={true} path="/users/:id">
          <ViewUser
            result={user}
            setDisplay={setCurrentDisplay}
            className={isListItem ? " AnimateViewChildOut" : ""}
          />
        </Route>
      </Switch>
    </section>
  );
});

// export const UserList = ({ result = [], isListItem, setDisplay }) => {
//   return (
//     <section className="Wrapper">
//       {shouldAnimate ? (
//         <section className={`UserList${!isListItem ? " AnimateUserListOut" : " AnimateUserListIn"}`}>
//           {result.map((item) => (
//             <UserItem
//               key={item.id}
//               userDetails={item}
//               setUser={setUser}
//               setDisplay={setDisplay}
//             />
//           ))}
//         </section>
//       ) : (
//         <ViewUser
//           result={user}
//           setDisplay={setDisplay}
//           className={isListItem ? " AnimateViewChildOut" : ""}
//         />
//       )}
//     </section>
//   );
// };
