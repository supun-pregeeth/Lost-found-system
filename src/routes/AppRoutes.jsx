import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { LostItems } from '../pages/LostItems';
import { FoundItems } from '../pages/FoundItems';
import { ReportItem } from '../pages/ReportItem';
import { ItemDetails } from '../pages/ItemDetails';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/lost" element={<LostItems />} />
    <Route path="/found" element={<FoundItems />} />
    <Route path="/report" element={<ReportItem />} />
    <Route path="/items/:id" element={<ItemDetails />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Routes>
);
