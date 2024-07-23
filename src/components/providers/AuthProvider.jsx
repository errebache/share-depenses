import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { alertActions } from "../../_store";
import { AuthContext } from "../../context";
import { addList, deleteList, getListByUserId } from "../../services/apis/lists";
import { login, logout } from "../../services/apis/auth";

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const initializeUser = async () => {
      setIsLoading(true);
      try {
        const storedUser = localStorage.getItem("user");
        const userFromServer = storedUser ? JSON.parse(storedUser) : null;
        if (userFromServer) {
          setUser(userFromServer);
          await fetchLists(userFromServer._id);
        }
      } catch (error) {
        console.error("Error initializing user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
  }, []);

  const fetchLists = async (userId) => {
    try {
      const listsData = await getListByUserId(userId);
      setLists(listsData);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  const signin = async (credentials) => {
    setIsLoading(true);
    dispatch(alertActions.clear());
    try {
      const newUser = await login(credentials);
      if (newUser !== null && newUser.auth !== false) {
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
        await fetchLists(newUser._id);
        navigate("/lists");
      } else {
        dispatch(alertActions.error(newUser.message));
      }
    } catch (error) {
      dispatch(alertActions.error("An error occurred during signin"));
      console.error("Error signing in: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddList = async (newList) => {
    try {
      const addedList = await addList(newList);
      setLists([...lists, addedList]);
      navigate("/lists");
    } catch (error) {
      console.error("Error adding list:", error);
    }
  };

  const handleDeleteList = async (idList) => {
    try {
      const deletedList = await deleteList(idList);
      if (deletedList) {
        setLists(lists.filter((lisst) => lisst._id !== idList));
      }
    } catch (error) {
      console.error("Error adding list:", error);
    }
  };

  const signout = async () => {
    setIsLoading(true);
    try {
      await logout();
      localStorage.removeItem("user");
      setUser(null);
      setLists([]);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signin,
        signout,
        isLoading,
        lists,
        setLists,
        handleAddList,
        handleDeleteList
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
