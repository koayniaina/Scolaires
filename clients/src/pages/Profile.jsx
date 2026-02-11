import React from "react";
import { useAuthProfile } from "../components/useAuthProfile";

const Profile = () => {
  const { user, logout } = useAuthProfile();

  return (
    <div>
      <h2>Page Profil</h2>
      {user ? (
        <div>
          <p><strong>Nom :</strong> {user.name}</p>
          <p><strong>Rôle :</strong> {user.role}</p>
        </div>
      ) : (
        <p>Chargement des informations...</p>
      )}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
