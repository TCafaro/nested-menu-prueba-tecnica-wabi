export interface MenuItem {
  id: number;
  name: string;
  children: MenuItem[];
  expanded?: boolean;
  closing?: ReturnType<typeof setTimeout> | undefined;
}
