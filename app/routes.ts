import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('./layouts/private.tsx', [index('pages/home.tsx'), route('logout', './pages/auth/logout.tsx')]),
  route('login', './pages/auth/login.tsx'),
] satisfies RouteConfig;
