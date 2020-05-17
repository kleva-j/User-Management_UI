import React from "react";

import "./App.css";
import UserApi, { fetchUsers } from "./Lib/Utils";
import { RightComponent } from "./Components/RightSection/Right";
import { LeftComponent } from "./Components/LeftSection/Left";
import { ButtonItem } from "./Lib/Components/ButtonItem";
import { ButtonContainer } from "./Lib/Containers/ButtonContainer";
import { FilterComponent } from "./Lib/Components/FilterComponent";

const URL = process.env.REACT_APP_API_URL;

export const App = () => {
  const [state, setState] = React.useState({
    users: UserApi.userDetails || [],
    loading: true,
    currentCategory: "All Users",
    categories: ["All Users", "Male Users", "Female Users"],
    searchTerm: "",
    countries: [],
  });

  const setCategory = (category) => {
    return setState((prevState) => {
      return {
        ...prevState,
        currentCategory: category,
      };
    });
  };

  const setUsers = (name) => {
    name === "all" &&
      setState((prevState) => {
        const users = UserApi.allUsers;
        const countries = UserApi.getCountries(users);
        return { ...prevState, users, countries };
      });
    name === "male" &&
      setState((prevState) => {
        const users = UserApi.allMaleUsers;
        const countries = UserApi.getCountries(users);
        return { ...prevState, users, countries };
      });
    name === "female" &&
      setState((prevState) => {
        const users = UserApi.allFeMaleUsers;
        const countries = UserApi.getCountries(users);
        return { ...prevState, users, countries };
      });
  };

  const findUser = (name) =>
    setState((prevState) => ({
      ...prevState,
      searchTerm: name,
      users: UserApi.searchByName(name),
    }));

  React.useEffect(() => {
    fetchUsers(URL)
      .then((result) => {
        UserApi.userDetails = result;
        const users = UserApi.allUsers;
        setState((prevState) => ({
          ...prevState,
          users,
          loading: false,
          countries: UserApi.getCountries(users),
        }));
      })
      .catch((_) =>
        setState((prevState) => ({ ...prevState, loading: false }))
      );
  }, []);

  const { categories, currentCategory, users, countries } = state;

  return (
    <section className="App">
      <section className="App-section">
        <LeftComponent findUser={findUser}>
          <ButtonContainer
            categories={categories}
            currentCategory={currentCategory}
          >
            <ButtonItem setCategory={setCategory} setUsers={setUsers} />
          </ButtonContainer>
        </LeftComponent>
        <RightComponent
          category={currentCategory}
          findUser={UserApi.searchByName}
          users={users}
          countries={countries}
          filterByCountry={UserApi.filterByCountry}
        >
          <FilterComponent countries={countries} />
        </RightComponent>
      </section>
    </section>
  );
};

export default App;
