import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";
import styles from "./CityList.module.css";
import { useCities } from "../contexts/CitiesContext";
function CityList() {
  const { cities, isloading } = useCities();
  if (isloading) return <Spinner />;
  if (!cities.length)
    return <Message message="Add your city by clicking on the map" />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
