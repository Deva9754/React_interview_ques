import { useEffect, useState } from "react";

const AutoCompletion = ()=>{
    const [input,setInput]=useState("");
    const [searchResult,setSearchResult]=useState([]);
    const [showResult,setShowResult]=useState(false);
    const [cached,setCached]=useState({});
    


const fetchData= async ()=>{
    if(cached[input]){
        console.log("cachedValue")
        setSearchResult(cached[input]);
        return;
    }
    // console.log("API CALL",input)
const fetchResult = await fetch("https://dummyjson.com/recipes/search?q=" + input);
const data= await fetchResult.json();
console.log(data?.recipes,"Data")
setSearchResult(data?.recipes);
setCached((prev)=>({...prev,[input]:data?.recipes}))

}
useEffect(()=>{
   const timer= setTimeout(fetchData,300);
   return()=>{
    clearTimeout(timer)
   };
}, [input]);

    return(
        <>
          <div className="text-center p-4 font-extrabold">Auto Completion Bar</div>
            
            
            <div>
            <input
             className="w-1/2 border-2 border-black-800 p-2 block mx-auto mt-2 rounded-lg" type="text"
             value={ input }
              placeholder="Enter Something !!"
               onChange={ (e) => { setInput(e.target.value) } }
               onFocus={()=>setShowResult(true)}
               onBlur={()=>setShowResult(false)}
               />
        </div>
        
      {showResult && input.trim().length  > 0 && searchResult.length> 0 &&  <div className=" w-1/2 mx-auto border-2 border-black-800">
            {searchResult?.map((r)=>(
                <div className=" flex p-2 bg-grey shadow-lg justify-between">
                <span className="text-sm font-medium" key={r.id}>{r.name}</span>
<img className="w-10 h-10 rounded-full object-cover " src={r.image} alt="" />
                </div>

            ))}
            </div>}
            </>
    )
}
export default AutoCompletion;