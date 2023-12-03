import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { type SyntheticEvent } from "react";
import { useRouter } from "next/router";

export default function Nav() {
  const router = useRouter();

  const signout = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    await router.push("/");
  };
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
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <Link onClick={signout} href="#">
              Sign out
            </Link>
          </Dropdown.Item>
        </Dropdown>
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
