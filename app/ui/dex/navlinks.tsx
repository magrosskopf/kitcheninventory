"use client";
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  ListBulletIcon,
  Square2StackIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
const links = [
  { name: "Inventar", href: "/inventar", icon: ListBulletIcon },
  {
    name: "Places",
    href: "/places",
    icon: Squares2X2Icon,
  },
  { name: "Profil", href: "/profil", icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            href={link.href}
            key={link.name}
            className={clsx(
              "flex flex-col btn btn-cirlce  items-center justify-center gap-2 font-medium ",
              {
                "btn-neutral": pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
