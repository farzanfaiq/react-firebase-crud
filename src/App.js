import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Users from './component/users';

export default function AppRoutes(){
  return (
    <div>
      <Routes>
        <Route path="/users" exact  element={<Users />} />
        <Route
            path="*"
            element={<Navigate to="/users" replace />}
        />
      </Routes>
    </div>
  );
}