import React from 'react';
import { Link } from 'react-router-dom';

export function Navigation () {
  return (
    <div>
      Navigation

      <Link to='auth'>Auth</Link>
    </div>
  )
}