import useAuth from './useAuth';

const useRoles = () => {
  const { auth } = useAuth; 
  
  const roles = auth?.roles || [];

  const hasRole = (role) => roles.includes(role);

  const hasAnyRole = (rolesToCheck) => rolesToCheck.some((role) => roles.includes(role));

  return {
    roles,
    hasRole,
    hasAnyRole,
  };
};

export default useRoles;
