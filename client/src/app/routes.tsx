import { Onboarding } from '@/features/onboarding/components/onboarding';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '@/features/authentication/components/login';
import { Register } from '@/features/authentication/components/register';
import { AuthLayout } from '@/features/authentication/components/layouth.auth';
import { LayoutDashboard } from '@/features/dashboard/components/layout';
import { Dashboard } from '@/features/dashboard/components';
import { DashboardBeasiswa } from '@/features/dashboard-beasiswa/components';
import { FormAddBeasiswa } from '@/features/dashboard-beasiswa/components/form.add-beasiswa';
import { Layout } from '@/features/components/layout';
import { Propmtpage } from '@/features/prompt-page/components';
import { FormEditBeasiswa } from '@/features/dashboard-beasiswa/components/form.edit-beasiswa';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<LayoutDashboard />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/dashboard/scholarship" element={<DashboardBeasiswa />}></Route>
        </Route>
        <Route element={<LayoutDashboard isCentered />}>
          <Route path="/dashboard/scholarship/create" element={<FormAddBeasiswa />}></Route>
          <Route path="/dashboard/scholarship/edit/:id" element={<FormEditBeasiswa />}></Route>
        </Route>
        <Route element={<Layout/>}>
          <Route path="/prompt" element={<Propmtpage/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};