import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const BASE_URL = "http://localhost:7000";
const CitiesContext = createContext();

const initialStat = {
  cities: [],
  isloading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  // console.log(state, action);
  // const x = { ...state };
  // console.log(x);
  switch (action.type) {
    case "loading":
      return { ...state, isloading: true };
    case "cities/loaded":
      return {
        ...state,
        isloading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        isloading: false,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isloading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "delete/city":
      return {
        ...state,
        isloading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isloading: false, error: action.payload };
    default:
      throw new Error("Unknow action");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isloading, currentCity }, dispatch] = useReducer(
    reducer,
    initialStat
  );

  useEffect(function () {
    async function fetchCityData() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error while loading data...",
        });
      }
    }
    fetchCityData();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        //   console.log(data);
        dispatch({ type: "city/loaded", isloading: true, payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error while loading city data...",
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({
        type: "city/created",
        payload: data,
      });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error while loading city data...",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "delete/city", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error while deleteing data...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isloading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error(
      "Cities context is used before citiesProvider! check you code..."
    );
  }
  return context;
}

/* eslint-disable react-refresh/only-export-components */
export { CitiesProvider, useCities };
