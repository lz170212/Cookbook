import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import Filter from "../components/Filter";
import { useLocation, useParams } from "react-router-dom";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [firstLoad,setFirstLoad] = useState(true);
  const [recipes, setRecipes] = useState(null);
  const [showMore,setShowMore] =useState(false);
  const [filterOptions, setFilterOptions] = useState({
    highlights: [],
    cookingTime: "60",
    sort: "createdAt",
    order:'desc',
  });

  const location = useLocation();
  useEffect(() => {
    if(location.search.indexOf('?')!==-1){ // solve click 'Home' button
      //user change url directly
    const urlParams = new URLSearchParams(window.location.search);
    const urlSearchTerm = urlParams.get("searchTerm");
    const urlHighlight = urlParams.get("highlight");
    const urlCookingTime = urlParams.get("cookingTime");
    const urlSort = urlParams.get("sort");
    const urlOrder = urlParams.get("order");
    if (urlSearchTerm || urlHighlight || urlCookingTime || urlSort) {
      // at least one of them not null
      //1. set filter UI
      const highlightParams = urlHighlight?.split(",")||[];
      setFilterOptions({
        highlights: highlightParams,
        cookingTime: urlCookingTime|| "60",
        sort: urlSort || "createdAt",
        order: urlOrder|| "desc",
      });
      //2. fetch result from database

      const fetchSearchedRecipes = async () => {
        setLoading(true);
        setShowMore(false);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/recipe/search-recipe?${searchQuery}`);
        const recipes = await res.json();
        setRecipes(recipes);
        if (recipes.length > 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
        setLoading(false);
      };

      fetchSearchedRecipes();
    }}else{
      fetchRecipes({});
      setFirstLoad(false);
    }
  }, [location.search]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      setShowMore(false);
      const res = await fetch("/api/recipe/get", {
        method: "GET",
      });

      const { data } = await res.json();
      if (data.length > 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setRecipes(data);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (location.search.indexOf('?')===-1) {
      fetchRecipes({});
      setFirstLoad(false);
    }
  }, []);

  const onShowMoreClick = async () => {
    const numberOfRecipes = recipes.length;
    const startIndex = numberOfRecipes;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/recipe/search-recipe?${searchQuery}`);
    const data = await res.json();
    if (data.length < 10) {
      setShowMore(false);
    }
    setRecipes([...recipes, ...data]);
  };
  return (
    <div className="flex flex-col md:flex-row">
      <Filter filter={filterOptions} setFilter={setFilterOptions}></Filter>
      <div className="py-5 px-[5vw] md:px-[7vw] lg:px-[10vw] gap-5 flex flex-wrap">
        {loading && (
          <h1 className="text-xl items-center ">
            Loading...
          </h1>
        )}
        {!loading && !firstLoad &&  (!recipes || recipes.length === 0) && (
          <h1 className="text-xl items-center">
            No Recipes Found!!!
          </h1>
        )}
        {!loading && recipes &&
        recipes.map((recipe, i) => {
          return <RecipeCard key={i} recipe={recipe} />;
        })}
        {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-green-700 hover:underline p-7 text-center w-full'
            >
              Show more
            </button>
          )}
      </div>
    </div>
  );
}
