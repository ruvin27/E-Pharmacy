import { createContext, useContext, useState } from "react";

const SearchDataContext = createContext();

export function SearchContextProvider({children}){
const [searchData , setSearchData] = useState("")
const [productDetails, setProductDetails] = useState([]);

    return(
        <SearchDataContext.Provider value={{searchData,setSearchData,productDetails,setProductDetails}}>
            {children}
        </SearchDataContext.Provider>
    )
}

export const useSearchContext = () =>{
    return useContext(SearchDataContext)
}

