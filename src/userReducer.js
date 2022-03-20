export const SET_COUNTRIES = "INCRESET_COUNTRIESMENT";
export const SET_USERS = "SET_USERS";
export const SET_SELECTED_COUNTRY = "SET_SELECTED_COUNTRY";

export const setCountries = countries => ({
  type: SET_COUNTRIES,
  countries,
});

export const setUsers = (country, users) => ({
  type: SET_USERS,
  country,
  users,
});

export const setSelectedCountry = country => ({
  type: SET_SELECTED_COUNTRY,
  country,
});


export const fetchUsers = country => (dispatch, getState) => {
  fetch("https://randomuser.me/api/?results=5000&nat=" + country)
    .then(res => res.json())
    .then(
      (result) => {
        dispatch(setUsers(country, result.results.map(r => ({name: r.name.title + '. ' + r.name.first +' '+ r.name.last, gender: r.gender, email: r.email }))))
      })
    .catch((err) => {
      console.log('err in fetch, do nothing show last saved information if there is', err)
    })
};

const initialState = {
  countries: ['AU', 'BR', 'CA', 'CH', 'DE', 'DK', 'ES', 'FI', 'FR', 'GB', 'IE', 'IR', 'NO', 'NL', 'NZ', 'TR', 'US'],
  countryUsers:[],
  selectedCountry: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        countryUsers: [...state.countryUsers, {country: action.country, users: action.users}]
      };
    case SET_COUNTRIES:
      return {
        ...state,
        countries: action.countries
      };
    case SET_SELECTED_COUNTRY:
      return {
        ...state,
        selectedCountry: action.country,
        users: []
      }
    default:
      return state;
  }
}

export default userReducer;
