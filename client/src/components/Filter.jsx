import React from "react";

const highlightOptions = [
  "low carb",
  "high protein",
  "vegetarian",
  "under 500 calories",
  "under 30min",
  "budget friendly",
  "meat lover",
];
const cookingTime = [5, 10, 15, 20, 30, 45, 60];
export default function Filter() {
  return (
    <div className="bg-gray-100 p-10 border-b-2 md:border-r-2 md:min-h-screen">
      <form className="mt-15 flex flex-col gap-8">
        <div className="flex flex-col gap-2 flex-wrap items-start">
          <label className="font-semibold">Highlights:</label>
          {highlightOptions.map((option) => (
            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-5" />
              <span>{option}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 flex-wrap items-start">
          <label className="font-semibold">Cooking Time:</label>
          {cookingTime.map((time) => (
            <div className="flex gap-2">
              <input type="radio" id="cooking_time" name="time" className="w-5" />
              <label for={time}>{time} mins</label>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start gap-2">
          <label className="font-semibold">Sort By:</label>
          <select id="sort_order" className="border rounded-lg p-3">
            <option>Least Cooking Time</option>
            <option>Most Recent</option>
            <option>Most Saved</option>
          </select>
        </div>
        <button className="bg-slate-700 text-white p-3 rounded-lg  hover:opacity-95">
          Filter
        </button>
      </form>
    </div>
  );
}
