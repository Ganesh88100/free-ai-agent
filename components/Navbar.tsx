type NavbarProps = { title: string };

export function Navbar({ title }: NavbarProps) {
  return <header className="navbar">{title}</header>;
}
