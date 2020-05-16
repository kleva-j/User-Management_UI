import React from "react";

import "./App.css";
import UserApi, { fetchUsers } from "./Lib/Utils";
import { RightComponent } from "./components/Right";
import { LeftComponent } from "./components/Left/Left";
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
    showCountry: true,
    country: undefined,
    countries: []
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
      setState((prevState) => ({ ...prevState, users: UserApi.allUsers }));
    name === "male" &&
      setState((prevState) => ({ ...prevState, users: UserApi.allMaleUsers }));
    name === "female" &&
      setState((prevState) => ({
        ...prevState,
        users: UserApi.allFeMaleUsers,
      }));
  };

  const setCountry = (country) => 
    setState((prevState) => ({
      ...prevState,
      country,
      users: UserApi.filterByCountry(country)
    }));

  const findUser = (name) =>
    setState((prevState) => ({
      ...prevState,
      searchTerm: name,
      users: UserApi.searchByName(name)
    }));

  const showCountry = () =>
    setState((prevState) => ({
      ...prevState,
      showCountry: !state.showCountry,
    }));

  React.useEffect(() => {
    fetchUsers(URL)
      .then((result) => {
        UserApi.userDetails = result;
        setState((prevState) => ({
          ...prevState,
          loading: false,
          users: UserApi.allUsers,
          countries: UserApi.allCountries,
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
          setCountry={setCountry}
          showCountry={showCountry}
          users={users}
        >
          <FilterComponent
            countries={countries}
            showCountry={state.showCountry}
            setShowCountry={showCountry}
            setCountry={setCountry}
          />
        </RightComponent>
      </section>
    </section>
  );
};

export default App;
