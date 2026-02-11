import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || !user) return <Navigate to="/" replace />;

  let userData;
  try {
    userData = JSON.parse(user);
  } catch {
    return <Navigate to="/" replace />;
  }

  // Vérifie si le rôle est autorisé
  if (allowedRoles && !allowedRoles.includes(userData.role)) {
    return <Navigate to="/profile" replace />;
  }

  return children;
}

export default ProtectedRoute;
