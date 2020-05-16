import React from "react";
// import { TransitionGroup, CSSTransition } from "react-transition-group";

import { UserItem } from "../Components/UserItem";
import { ViewUser } from "../Components/ViewUser";

// export const UserList = ({ result = [] }) => {
//   console.log(result)
//   return (
//     <TransitionGroup component="section" className="UserList">

//       {result.map((item) => (
//         <CSSTransition
//           key={item.id}
//           timeout={0}
//           classNames="transition"
//           // transitionEnterTimeout={300}
//           // transitionLeaveTimeout={300}
//         >
//           <UserItem key={item.id} userDetails={item} />
//         </CSSTransition>
//       ))}

//     </TransitionGroup>
//   );
// };

// export const UserList = ({ result = [] }) => {
//   console.log(result)
//   return (
//     <section className="UserList">
//       {result.map((item) => (
//         <UserItem key={item.id} userDetails={item} />
//       ))}
//     </section>
//   );
// };

// export const UserList = ({ result = [] }) => {
//   return (
//     <TransitionGroup component="section" className="Wrapper">
//       <CSSTransition
//         timeout={300}
//         classNames="transition"
//         transitionEnterTimeout={300}
//         transitionLeaveTimeout={300}
//       >
//         <section>
//           {result.map((item) => (
//             <UserItem key={item.id} userDetails={item} />
//           ))}
//         </section>
//       </CSSTransition>
//     </TransitionGroup>
//   );
// };

// export const UserList = ({ result = [], isListItem, setDisplay }) => {
//   const [user, setUser] = React.useState({});

//   return (
//     <TransitionGroup component="section" className="Wrapper">
//       <CSSTransition
//         timeout={300}
//         classNames="transition"
//         transitionEnterTimeout={300}
//         transitionLeaveTimeout={300}
//       >
//         {isListItem ? (
//           <>
//             {result.map((item) => (
//               <UserItem
//                 key={item.id}
//                 userDetails={item}
//                 setUser={setUser}
//                 setDisplay={setDisplay}
//               />
//             ))}
//           </>
//         ) : (
//           <ViewUser result={user} setDisplay={setDisplay} />
//         )}
//       </CSSTransition>
//     </TransitionGroup>
//   );
// };


export const UserList = ({ result = [], isListItem, setDisplay }) => {
  const [user, setUser] = React.useState({});

  return (
    <section className="Wrapper">
      {isListItem ? (
        <>
          {result.map((item) => (
            <UserItem
              key={item.id}
              userDetails={item}
              setUser={setUser}
              setDisplay={setDisplay}
            />
          ))}
        </>
      ) : (
        <ViewUser result={user} setDisplay={setDisplay} />
      )}
    </section>
  );
};