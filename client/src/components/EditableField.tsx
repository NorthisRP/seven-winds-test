import React from "react";
import TextField from "@mui/material/TextField";

interface FieldProps {
  editMode: boolean;
  bind: {};
  title: string;
  text: string;
}

export default function EditableField({
  editMode,
  bind,
  text,
  title,
}: FieldProps) {
  return (
    <div>
      {editMode ? (
        <TextField variant="outlined" label="LastName" {...bind} />
      ) : (
        <div>
          <p>{title}</p>
          <h3>{text}</h3>
        </div>
      )}
    </div>
  );
}
