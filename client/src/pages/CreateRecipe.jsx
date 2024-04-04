import DefaultUploadImg from "../img/upload-img-icon.jpg";
import { useEffect, useState } from "react";
import { FaMinusSquare } from "react-icons/fa";
import { app } from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import SortableIngredients from "../components/SortableIngredients";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableInstructions from "../components/SortableInstructions";

const recipeStructure = {
  name: "",
  author: "",
  image: "",
  highlights: [],
  ingredients: ["", "", ""],
  instructions: ["", "", ""],
  prep_time: "",
  is_customized: false,
};
const highlightOptions = [
  "low carb",
  "high protein",
  "vegetarian",
  "under 500 calories",
  "under 30min",
  "budget friendly",
  "meat lover",
];

const CreateRecipePage = (req, res, next) => {
  let { id } = useParams();
  const [recipe, setRecipe] = useState(recipeStructure);
  const [ingredients, setIngredients] = useState(["", "", ""]);
  const [instructions, setInstructions] = useState(["", "", ""]);
  let { name, image, highlights, prep_time } = recipe;
  let navigate = useNavigate();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const fetchRecipe = async () => {
    try {
      const res = await fetch(`/api/recipe/get/${id}`, {
        method: "GET",
      });

      const { data } = await res.json();
      setRecipe(data);
      setIngredients(data.ingredients);
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchRecipe();
    }
  }, [id]);

  const handleImgUpload = (e) => {
    let file = e.target.files[0];
    if (!file) {
      return;
    }
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const imageRef = ref(storage, fileName);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          setRecipe({ ...recipe, image: url });
        })
        .catch((err) => console.log(48, err.message));
    });
  };

  const handleAddRow = (key) => {
    /*let list = recipe[key];
    setRecipe({ ...recipe, [key]: [...list, ""] });*/
    if (key === "ingredients") {
      setIngredients([...ingredients, ""]);
    } else if (key === "instructions") {
      setInstructions([...instructions, ""]);
    }
  };

  const handleHighlightsChange = (item) => {
    let i = highlights.indexOf(item);
    if (i !== -1) {
      highlights.splice(i, 1);
    } else {
      highlights.push(item);
    }

    setRecipe({ ...recipe, highlights: highlights });
  };

  const handleInputFieldChange = (e, key, i) => {
    if (key === "ingredients") {
      ingredients[i] = e.target.value;
      setRecipe({ ...recipe, ingredients });
    } else {
      instructions[i] = e.target.value;
      setRecipe({ ...recipe, instructions });
    }
  };

  const handleInputFieldDelete = (i, key) => {
    if (key === "ingredients") {
      ingredients.splice(i, 1);
      setRecipe({ ...recipe, ingredients });
    } else {
      instructions.splice(i, 1);
      setRecipe({ ...recipe, instructions });
    }
  };

  const handleRecipeSave = async (e) => {
    if (!name.length) {
      toast.error("Please give your recipe a name in order to save");
    }
    if (!image.length) {
      toast.error("Please upload a cover image for your recipe");
    }
    if (!highlights.length) {
      toast.error("Please choose at least 1 highlight in order to save");
    }
    if (prep_time === "" || prep_time === "please select") {
      toast.error("Please provide an estimate of prep time in order to save");
    }
    if (!ingredients.join("").length) {
      toast.error(
        "Please provide ingredients for your recipe in order to save"
      );
    }
    if (!instructions.join("").length) {
      toast.error(
        "Please provide instructions for your recipe in order to save"
      );
    }

    let loadingToast = toast.loading("saving recipe...");

    if (id) {
      recipe.is_customized = true;
    }

    try {
      const res = await fetch("/api/recipe/create-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });

      const data = await res.json();

      if (data.success === false) {
        // setError(data.message)
        toast.dismiss(loadingToast);
        return;
      }

      toast.dismiss(loadingToast);
      toast.success("Saved 👍");
      console.log(data);
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      toast.dismiss(loadingToast);
      // setError(err.message);
    }
  };

  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (active.id !== over.id) {
      if (active.data.current.type === "ingredients") {
        setIngredients((ingredients) => {
          const oldIndex = active.id - 1;
          const newIndex = over.id - 1;
          return arrayMove(ingredients, oldIndex, newIndex);
        });
      } else {
        setInstructions((instructions) => {
          const oldIndex = active.id - 1;
          const newIndex = over.id - 1;
          return arrayMove(instructions, oldIndex, newIndex);
        });
      }
    }
  };

  return (
    <main className="font-montserrat max-w-[90vw] flex flex-col mx-auto  py-4 px-[5vw] md:px-[7vw] lg:px-[10vw]">
      <Toaster />
      <h1 className="font-medium text-3xl text-center my-6">
        {id ? "Edit" : "Create"} Recipe
      </h1>

      <form className="flex max-md:flex-col gap-16 lg:gap-28 mt-10 justify-center">
        <div className="flex flex-col gap-10 ">
          <label
            htmlFor="uploadBanner"
            className="border-4 border-slate-300 rounded-md flex justify-center items-center"
          >
            <img
              src={image ? image : DefaultUploadImg}
              className="min-w-[400px] aspect-square"
            />
            <input
              id="uploadBanner"
              type="file"
              accept=".png, .jpg, .jpeg"
              hidden
              onChange={(e) => {
                handleImgUpload(e);
              }}
            />
          </label>

          <textarea
            defaultValue={name}
            onChange={(e) => {
              setRecipe({ ...recipe, name: e.target.value });
            }}
            placeholder="Recipe Name..."
            className="resize-none placeholder:opacity-40 w-full h-14 rounded-md font-montserrat text-2xl py-3 px-5"
          ></textarea>

          <div>
            <label className="text-xl font-medium text-blue-600">
              ⏳ Estimated Prep Time
            </label>
            <select
              className="w-full h-14 rounded-md mt-2"
              value={prep_time}
              onChange={(e) => {
                setRecipe({ ...recipe, prep_time: e.target.value });
              }}
            >
              <option>please select</option>
              <option value={5}>⏰ 5 mins</option>
              <option value={10}>⏰ 10 mins</option>
              <option value={15}>⏰ 15 mins</option>
              <option value={20}>⏰ 20 mins</option>
              <option value={30}>⏰ 30 mins</option>
              <option value={45}>⏰ 45 mins</option>
              <option value={60}>⏰ 60 mins</option>
            </select>
          </div>
        </div>

        <div className="min-w-[50%] flex flex-col gap-10">
          <div>
            <p className="text-xl font-medium text-blue-600">💡 Highlights</p>
            <div className="mt-3">
              {highlightOptions.map((item, i) => {
                return (
                  <div key={i} className="flex gap-2">
                    <input
                      type="checkbox"
                      id={item}
                      className="w-5"
                      checked={highlights.includes(item)}
                      onChange={() => handleHighlightsChange(item)}
                    />
                    <span className="capitalize">{item}</span>
                  </div>
                );
              })}
            </div>
          </div>

        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
              items={ingredients}
              strategy={verticalListSortingStrategy}
            >
              <div className="my-3">
                <p className="text-xl font-medium text-blue-600">
                  🥕 Ingredients
                </p>

                <p className="font-gelasio italic my-1 text-gray-500">
                  Please use numeric numbers for the amount. Eg. 1 medium
                  carrots.{" "}
                </p>
                {ingredients?.map((item, i) => {
                  return (
                    <SortableIngredients
                      key={i}
                      index={i}
                      item={item}
                      handleInputFieldChange={handleInputFieldChange}
                      handleInputFieldDelete={handleInputFieldDelete}
                    ></SortableIngredients>
                  );
                })}

                <div className="flex justify-start">
                  <span
                    className="h-10 w-[40vw] lg:w-[35vw] border-2 border-dashed mt-2 flex justify-center items-center text-4xl rounded-md cursor-pointer"
                    onClick={() => {
                      handleAddRow("ingredients");
                    }}
                  >
                    +
                  </span>
                </div>
              </div>
            </SortableContext>
          </DndContext>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={instructions}
              strategy={verticalListSortingStrategy}
            >
              <div className="my-3">
                <p className="text-xl font-medium text-blue-600">
                  📝 Instructions
                </p>

                {instructions.map((item, i) => {
                  return (
                    <SortableInstructions
                      key={i}
                      index={i}
                      item={item}
                      handleInputFieldChange={handleInputFieldChange}
                      handleInputFieldDelete={handleInputFieldDelete}
                    ></SortableInstructions>
                  );
                })}
                <div className="flex justify-start">
                  <span
                    className="h-10 w-[40vw] lg:w-[35vw] border-2 border-dashed mt-2 flex justify-center items-center text-4xl rounded-md cursor-pointer"
                    onClick={() => {
                      handleAddRow("instructions");
                    }}
                  >
                    +
                  </span>
                </div>
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </form>

      <div className="flex justify-center mt-16">
        <button
          className="w-[300px] bg-black text-white rounded-full py-3 px-6 text-xl capitalize hover:bg-opacity-80"
          onClick={handleRecipeSave}
        >
          Save Recipe
        </button>
      </div>
    </main>
  );
};

export default CreateRecipePage;
