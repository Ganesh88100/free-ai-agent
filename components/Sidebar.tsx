type SidebarProps = { items: string[] };

export function Sidebar({ items }: SidebarProps) {
  return <aside className="sidebar">{items.map((item) => <div key={item} className="sidebar-item">{item}</div>)}</aside>;
}
