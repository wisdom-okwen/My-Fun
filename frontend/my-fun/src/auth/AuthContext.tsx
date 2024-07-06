import React, { createContext, useEffect, useReducer, ReactNode } from "react";

type AuthState = {
    userId: string | null;
    accessToken: string | null;
};

type LoginAction = {
    type: 'login';
    payload: {
        userId: string;
        accessToken: string;
    };
};

type LogoutAction = {
    type: 'logout';
};

type AuthContextType = AuthState & {
    login: (userId: string, accessToken: string) => void;
    logout: () => void;
};

type AuthAction = LoginAction | LogoutAction;

export const UserContext = createContext<AuthContextType | null>(null);

const authReducer: React.Reducer<AuthState, AuthAction> = (state, action) => {
    switch (action.type) {
      case 'login':
        return {
          userId: action.payload.userId,
          accessToken: action.payload.accessToken
        };
      case 'logout':
        return {
          userId: null,
          accessToken: null
        };
      default:
        return state;
    }
  };

const initialState: AuthState = {
    userId: null,
    accessToken: null
  };

const UserContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, dispatch] = useReducer(authReducer, initialState);

    const login = (userId: string, accessToken: string) => {
        dispatch({ type: 'login', payload: { userId, accessToken } });
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userId', userId);
    };

    const logout = () => {
        dispatch({ type: 'logout' });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId');
    
        if (accessToken && userId) {
          dispatch({ type: 'login', payload: { userId, accessToken } });
        }
    }, []);

    return (
        <UserContext.Provider value={{ ...currentUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContextProvider };