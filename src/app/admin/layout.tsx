// app/admin/layout.tsx
import React from 'react';
import { Metadata } from 'next';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import styles from './admin.module.css';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Ashutosh Gautam',
  description: 'Admin dashboard for portfolio and blog management',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminLayout}>
      <AdminSidebar />
      <div className={styles.adminContent}>
        <AdminHeader />
        <main className={styles.adminMain}>
          {children}
        </main>
      </div>
    </div>
  );
}