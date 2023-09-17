import React, {useState, createContext, useContext, useEffect} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    // const[user, setUser] = useState({
    //   email: '',
    //   password:'',
    //   name:'',
    //   address: '',
    //   phone: ''
    // });
    
    const login = (userData) => {
        setUser(userData);
    }

    const logout = () => {
      console.log(user);
        setUser(null);
        console.log(user);
    }

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }, []);
    
      // Update localStorage or cookies when user data changes
      useEffect(() => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          localStorage.removeItem('user');
        }
      }, [user]);

    return (
        <AuthContext.Provider value={{ user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
  };