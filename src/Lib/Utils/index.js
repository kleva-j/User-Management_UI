/* eslint-disable array-callback-return */
import axios from 'axios';

export const fetchUsers = async (url, params={}) => {
  return await (await axios.get(url, {
    params: {
      results: 20,
      ...params,
    }
  })).data?.results;
};

const setUserFormat = (user) => {
  const {
    name: { first, last },
    phone, cell, email, gender,
    picture: { large }, login: { uuid },
    location: {
      city, state, country,
      street: { name, number }
    }, dob: { age }, registered: { date }
  } = user;
  const newDate = new Date(date).toLocaleDateString().split('/').reverse().join('-');
  return {
    name: `${first} ${last}`, reg: newDate,
    pic: large, phone, email, id: uuid, age,
    city, state, country, gender, phone2: cell,
    address: `${number} ${name}, ${city}, ${state}`,
  }
};

/**
 * @class UserApi
 */
export class UserApi {
  constructor(userData=[]) {
    this.userData = userData;
  }

  /**
   * @param {any[]} userData
   */
  set userDetails(userData) {
    return this.userData = userData.map(setUserFormat);
  };

  /**
   * @memberof UserApi
   * @public
   * @type {Array} All users
   */
  get allUsers() {
    return this.userData;
  };
  
  /**
   * @memberof UserApi
   * @public
   * @param {string} country Country name
   * @param {Array} countryList List of available countries
   * @returns {Array} Users in selected country
   */
  filterByCountry(country, countryList) {
    if (countryList) {
      return countryList.filter(item => item.country === country);
    }
    return this.userData.filter(item => item.country === country);
  };

  /**
   * @memberof UserApi
   * @public
   * @type {Array} All male users
   */
  get allMaleUsers() {
    return this.userData.filter(item => item.gender === "male");
  };

  /**
   * @memberof UserApi
   * @public
   * @type {Array} All female users
   */
  get allFeMaleUsers() {
    return this.userData.filter(item => item.gender === "female");
  };

  /**
   * @memberof UserApi
   * @public
   * @type {Array} All users country
   */
  get allCountries() {
    const countryList = [];
    this.userData.filter(item => {
      if (countryList.includes(item.country)) return;
      return countryList.push(item.country);
    });
    return countryList;
  }

  /**
   * @memberof UserApi
   * @public
   * @param {string} name Search name
   * @param {Array} namesList Nameslist
   * @returns {Array} Searched result of a user
   */
  searchByName(name, namesList) {
    if (namesList) {
      return namesList.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
    }
    return this.userData.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
  };
};

export default new UserApi();
