import React from "react";
import { default as MUIAvatar } from "@mui/material/Avatar";

function Avatar({ src, fallback }) {
  return (
    <MUIAvatar
      sx={{
        height: 150,
        width: 150,
        borderRadius: "100%",
      }}
      src={src}
    >
      {fallback && (
        <img
          style={{ height: "150px", width: "150px", borderRadius: "100%" }}
          src={fallback}
          alt="Profile"
        />
      )}
    </MUIAvatar>
  );
}

export default Avatar;
