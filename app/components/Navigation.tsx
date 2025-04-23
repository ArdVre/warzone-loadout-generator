import Link from "next/link";
import Image from "next/image";
import { FaBullseye } from "react-icons/fa";

const Navigation: React.FC = () => {
  const linkStyling: string =
    "inline-block px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800/90 cursor-pointer rounded transition-all duration-200 ease-in-out";

	interface ButtonProps{
		label: string;
		href: string;
	}

	const buttons: ButtonProps[] = [
		{
			label: "Log in",
			href: "/login"
		},
		{
			label: "Profile",
			href: "/profile"
		}
	]

  return (
    <nav className="flex items-center justify-around px-6 py-4 border-b-1 border-slate-200 dark:border-slate-700 shadow-xl">
			<header className="text-center flex items-center justify-center gap-2">
				<FaBullseye className="text-blue-400 dark:text-blue-600" size={22}/>
				<h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
					WZForge
				</h2>
			</header>
      <ul>
        <li className={linkStyling}>
          <Link prefetch href="/">
            Home
          </Link>
        </li>
        <li className={linkStyling}>
          <Link prefetch href="/random">
            Generator
          </Link>
        </li>
        <li className={linkStyling}>
          <Link prefetch href="/contact">
            Contact
          </Link>
        </li>
      </ul>
			<div className="flex justify-around gap-3 ">
				{buttons.map((button, index) => (
					<Link href={button.href} key={index} className="hover:bg-slate-200 dark:hover:bg-background-alt px-4 py-2 rounded bg-slate-150 dark:bg-black">
						{button.label}
					</Link>
				))}
			</div>
    </nav>
  );
};

export default Navigation;
