import React from "react";
import avatar from "../components/character copy.png"; // Add a default avatar image

function UserCharacter({ user }) {
  return (
    <div className="text-center mb-4">
      <img
        src={user?.avatar || avatar}
        alt="Character"
        className="rounded-circle shadow"
        style={{ width: "100px", height: "100px", objectFit: "cover" }}
      />
      <h5 className="mt-2">{user?.name || "Eco Hero"}</h5>
    </div>
  );
}

export default UserCharacter;
