import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    rightActions?: ReactNode;
}

export default ({ children, breadcrumbs, rightActions = null, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} rightActions={rightActions} {...props}>
        {children}
    </AppLayoutTemplate>
);
