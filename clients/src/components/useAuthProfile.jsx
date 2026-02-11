import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useAuthProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (userData) setUser(JSON.parse(userData));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return { user, logout };
}
