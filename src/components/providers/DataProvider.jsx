import { Children, useEffect, useState } from "react";
import { useFetchData } from "../../hooks/useFetchData";
import { API_USERS } from "../../services/apis/apis";
import { useParams } from "react-router-dom";
import { DataContext } from "../../context/DataContext";

function DataProvider({children}) {
   const { idList } = useParams();
   const { usersList , isLoading, error } = useFetchData(`${API_USERS}/usersList/${idList}`);

 
    return (
        <DataContext.Provider value={{ usersList }}>
          {children}
        </DataContext.Provider>
    );
}

export default DataProvider;