export interface DynamicRoutes {
  path: string;
  title: string;
}

export const dynamicRoutes: DynamicRoutes[] = [
  {
    path: "/department",
    title: "Department"
  },
  {
    path: "/user",
    title: "User"
  },
  {
    path: "/role",
    title: "Role"
  },
  {
    path: "/schedule",
    title: "Schedule"
  }
];
