import React from "react";
import { Link } from "react-router-dom";

export function Button() {
  return (
    <button>
      Button
      <Link to="auth">Auth</Link>
    </button>
  );
}
