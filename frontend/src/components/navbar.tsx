import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { type SyntheticEvent } from "react";
import { useRouter } from "next/router";

interface AuthProps {
  auth: boolean;
}

export default function Nav({ auth }: AuthProps) {
  const router = useRouter();
  const user = {
    name: "Test User",
    email: "test@example.com",
  };

  const logout = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch("http://127.0.0.1:8000/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    auth = false;
    await router.push("/login");
  };

  let menu;

  if (!auth) {
    menu = (
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <Avatar
            alt="User settings"
            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            rounded
          />
        }
      >
        <Dropdown.Item>
          <Link href="/login">Login</Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link href="/register">Register</Link>
        </Dropdown.Item>
      </Dropdown>
    );
  } else {
    menu = (
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <Avatar
            alt="User settings"
            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            rounded
          />
        }
      >
        <Dropdown.Header>
          <span className="block text-sm">{user.name}</span>
          <span className="block truncate text-sm font-medium">
            {user.email}
          </span>
        </Dropdown.Header>
        <Dropdown.Item>
          <Link href="#">Dashboard</Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link href="#">Settings</Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link href="#">Earnings</Link>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>
          <Link onClick={logout} href="#">
            Logout
          </Link>
        </Dropdown.Item>
      </Dropdown>
    );
  }

  return (
    <Navbar className="bg-gray-50">
      <Navbar.Brand href="https://saferpilot.com">
        <Image
          src="/logo.png"
          className="mr-3 h-6 sm:h-9"
          alt="Safer Pilot Logo"
          width={36}
          height={36}
        />
        <div
          className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
          style={{ width: 0, overflow: "visible" }}
        >
          Safer<span className="text-blue-400">Pilot</span>
        </div>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {menu}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
