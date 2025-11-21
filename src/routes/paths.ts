/**
 * Centralized route paths
 * Makes it easier to maintain and change routes across the application
 */
export const ROUTES = {
    HOME: '/',
    SETTINGS: '/settings',
} as const

/**
 * Type-safe route navigation
 */
export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]
