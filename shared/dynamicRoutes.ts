interface CompoenentProps {
  property: string;
}

interface RouteComponents {
  get: CompoenentProps;
}

export interface DynamicRoutes {
  path: string;
  title: string;
  components: RouteComponents;
}

export const dynamicRoutes: DynamicRoutes[] = [
  {
    path: "/department",
    title: "Department",
    components: {
      get: {
        property: "getAllDepartment"
      }
    }
  }
];
