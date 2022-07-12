import { useEffect, useState } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [hasError, setHasError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-c2f53-default-rtdb.firebaseio.com/foods.json"
      );

      if (!response.ok) {
        throw new Error("Someting went wrong!");
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };
    

    fetchMeals().catch((error) => {
      setHasError(error.message);
      setIsLoading(false);
     
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.meals}>
        <p className={classes.mealsLoading}>loading!</p>
      </section>
    );
  }
  if (hasError) {
    return (
      <section className={classes.meals}>
        <p className={classes.mealsError}>{hasError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
