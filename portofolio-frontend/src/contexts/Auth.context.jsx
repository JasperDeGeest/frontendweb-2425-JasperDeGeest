import {
  createContext,
  useState,
  useCallback,
  useMemo,
} from 'react';
import useSWRMutation from 'swr/mutation';
import * as api from '../api';
import useSWR from 'swr';

export const JWT_TOKEN_KEY = 'jwtToken';
export const USER_ROLES_KEY = 'userRoles';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));
  const [roles, setRoles] = useState(
    JSON.parse(localStorage.getItem(USER_ROLES_KEY)) || [],
  );

  const {
    data: user,
    loading: userLoading,
    error: userError,
    mutate: refreshUser,
  } = useSWR(token ? 'accounts/me' : null, api.getById);

  const {
    isMutating: loginLoading,
    error: loginError,
    trigger: doLogin,
  } = useSWRMutation('sessions', api.post);

  const {
    isMutating: registerLoading,
    error: registerError,
    trigger: doRegister,
  } = useSWRMutation('accounts', api.post);

  const setSession = useCallback((token, roles) => {
    setToken(token);
    setRoles(roles);
    localStorage.setItem(JWT_TOKEN_KEY, token);
    localStorage.setItem(USER_ROLES_KEY, JSON.stringify(roles));
  }, []);

  const fetchAndSetUserRoles = useCallback(async () => {
    try {
      const user = await api.getById('accounts/me');
      const userRoles = user?.roles || [];
      setRoles(userRoles);
      localStorage.setItem(USER_ROLES_KEY, JSON.stringify(userRoles));
    } catch (error) {
      console.error('Failed to fetch user roles:', error);
      setRoles([]);
      localStorage.removeItem(USER_ROLES_KEY);
    }
  }, []);

  const login = useCallback(
    async (email, password) => {
      try {
        const { token } = await doLogin({
          email,
          password,
        });

        setSession(token, []);
        await fetchAndSetUserRoles();

        refreshUser();
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doLogin, setSession, fetchAndSetUserRoles, refreshUser],
  );

  const register = useCallback(
    async (data) => {
      try {
        const { token } = await doRegister(data);

        setSession(token, []);
        await fetchAndSetUserRoles();

        refreshUser();
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doRegister, setSession, fetchAndSetUserRoles, refreshUser],
  );

  const logout = useCallback(() => {
    setToken(null);
    setRoles([]);
    localStorage.removeItem(JWT_TOKEN_KEY);
    localStorage.removeItem(USER_ROLES_KEY);
  }, []);

  const value = useMemo(
    () => ({
      user,
      error: loginError || userError || registerError,
      loading: loginLoading || userLoading || registerLoading,
      isAuthed: Boolean(token),
      ready: !userLoading,
      isAdmin: roles.includes('admin'),
      roles,
      login,
      logout,
      register,
    }),
    [
      token,
      roles,
      user,
      loginError,
      loginLoading,
      userError,
      userLoading,
      registerError,
      registerLoading,
      login,
      logout,
      register,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
