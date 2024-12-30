import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('./layouts/private.tsx', [
    index('pages/home.tsx'),
    route('pulses', './pages/pulses/index.tsx'),
    route('pulses/:uuid/desktop', './pages/pulses/details.tsx'),
    route('urls', './pages/urls/index.tsx'),
    route('urls/:uuid', './pages/urls/details.tsx'),
    route('targets/:uuid', './pages/targets/details.tsx'),
    route('targets', './pages/targets/index.tsx'),
    route('projects/:uuid/schedules', './pages/projects/schedules.tsx'),
    route('projects/:uuid', './pages/projects/details.tsx'),
    route('projects', './pages/projects/index.tsx'),
    route('me', './pages/me.tsx'),
    route('logout', './pages/auth/logout.tsx'),
  ]),
  route('login', './pages/auth/login.tsx'),
] satisfies RouteConfig;
