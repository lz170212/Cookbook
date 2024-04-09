import React from "react";
import { useNavigate } from "react-router-dom";

const highlightOptions = [
  "low carb",
  "high protein",
  "vegetarian",
  "under 500 calories",
  "under 30min",
  "budget friendly",
  "meat lover",
];
const cookingTime = ["5","10","15","20","30","45","60"];
export default function Filter({filter, setFilter}) {
    const navigate = useNavigate();
    const handleOnChange =(e)=>{
        if(highlightOptions.includes(e.target.id)){
            if(!filter.highlights) return;
            let i = filter.highlights.indexOf(e.target.value);
            if (i !== -1) {
                filter.highlights.splice(i, 1);
            } else {
                filter.highlights.push(e.target.value);
            }
            setFilter({...filter, highlights:filter.highlights});
        }else if(cookingTime.includes(e.target.id)){
            setFilter({...filter,cookingTime:e.target.value});
        }else if(e.target.id==='sort_order'){
            let order;
            if(e.target.value===('createdAt' ||'total_collect' )){
                order = "desc";
            }else{
                order="asc";
            }
            setFilter({...filter, sort: e.target.value, order:order});
            
        }
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = urlParams.get('searchTerm');
       
        urlParams.set('highlight',filter.highlights);
        urlParams.set('cookingTime',filter.cookingTime);
        urlParams.set('sort', filter.sort);
        urlParams.set('order',filter.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }
  return (
    <div className="bg-gray-100 p-10 border-b-2 md:border-r-2 md:min-h-screen">
      <form onSubmit ={handleSubmit} className="mt-15 flex flex-col gap-8">
        <div className="flex flex-col gap-2 flex-wrap items-start">
          <label className="font-semibold">Highlights:</label>
          {highlightOptions.map((option,i) => (
            <div key ={i} className="flex gap-2">
              <input checked= {filter.highlights?.includes(option)} key={i+"_input"} onChange={handleOnChange} type="checkbox" id={option} className="w-5" name="highlight" value={option} />
              <label key={i+"_label"} htmlFor={option}>{option}</label>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 flex-wrap items-start">
          <label className="font-semibold">Cooking Time:</label>
          {cookingTime.map((time,i) => (
            <div key={i} className="flex gap-2">
              <input checked={filter.cookingTime===time} key={i+"_input"} onChange={handleOnChange} type="radio" id={time} value ={time} name="cooking_time" className="w-5" />
              <label  key={i+"_label"} htmlFor={time}> &lt;= {time} mins</label>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start gap-2">
          <label htmlFor= 'sort_order' className="font-semibold">Sort By:</label>
          <select defaultValue ={filter.sort} onChange={handleOnChange} id="sort_order" className="border rounded-lg p-3">  
            <option value='createdAt'>Most Recent</option>
            <option value='prep_time'>Least Cooking Time</option>
            <option value="total_collect">Most Saved</option>
          </select>
        </div>
        <button className="bg-slate-700 text-white p-3 rounded-lg  hover:opacity-95">
          Filter
        </button>
      </form>
    </div>
  );
}
