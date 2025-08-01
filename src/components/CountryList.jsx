import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";
import styles from "./CountryList.module.css";
import { useCities } from "../contexts/CitiesContext";
function CountryList() {
  const { cities, isloading } = useCities();
  if (isloading) return <Spinner />;
  if (!cities.length)
    return <Message message="Add your city by clicking on the map" />;

  const countries = cities.reduce((arr, currentCity) => {
    if (!arr.map((el) => el.country).includes(currentCity.country))
      return [
        ...arr,
        { country: currentCity.country, emoji: currentCity.emoji },
      ];
    else return arr;
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
