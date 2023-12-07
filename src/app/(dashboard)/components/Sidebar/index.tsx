"use client";
import React from "react";
import Link from "next/link";
import WarmupIcon from "@/app/assets/icons/svg/cast.svg";
import Link3 from "@/app/assets/icons/svg/Gmail.svg";
import Link4 from "@/app/assets/icons/svg/server.svg";
import Link5 from "@/app/assets/icons/svg/image 1.svg";
import Link6 from "@/app/assets/icons/svg/settings.svg";
import WarmupSidebar from "./components/WarmupSidebar";
import MailServersSidebar from "./components/MailServersSidebar";
import EmailListsSidebar from "./components/EmailListsSidebar";
import { usePathname } from "next/navigation";
// import { useAppDispatch, useAppSelector } from '@/app/(dashboard)/store/hooks'
// import { selectIsSidebarOpen } from '@/app/(dashboard)/store/slices/sidebarSlice'
import { Tooltip } from "react-tooltip";

interface Sidebar {
  title: string;
  component: () => React.JSX.Element;
}

const sidebars: Sidebar[] = [
  {
    title: "Warm-ups",
    component: WarmupSidebar,
  },
  {
    title: "Mail Servers",
    component: MailServersSidebar,
  },
  {
    title: "Email Lists",
    component: EmailListsSidebar,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  let SecSidebar: Sidebar | null = null;
  // const dispatch = useAppDispatch()
  const isSidebarOpen = true;
  const warmUpsRoute = "/warm-ups";
  const warmUpsRouteRafe = "/warm-up-rafe";
  const mailServersRoute = "/mail-servers";
  const emailListsRoute = "/email-lists";
  const settingsRoute = "/settings";

  // add more conditions for the sidebar of other pages
  if (
    pathname.startsWith(warmUpsRoute) ||
    pathname.startsWith(warmUpsRouteRafe)
  ) {
    SecSidebar = sidebars[0];
  } else if (pathname.startsWith("/mail-servers")) {
    SecSidebar = sidebars[1];
  } else if (pathname.startsWith("/email-lists")) {
    SecSidebar = sidebars[2];
  }

  return (
    <section className="flex h-full">
      {/* primary navigation */}
      <nav className="flex flex-col justify-between w-fit gap-2 bg-blue">
        <ul className="flex flex-col items-center justify-start h-full py-5 gap-5 md:gap-10">
          <Link href={"/"} className="shadow-md">
            {
              // <Image src={Link5} alt="" className="w-8 h-8" />
              <Link5 />
            }
          </Link>
          {/* nav items */}
          <div className="flex flex-col items-center justify-start h-full gap-2">
            <li
              className={`cursor-pointer p-2 transition duration-300 ${
                pathname.startsWith(warmUpsRoute) ? `bg-blue-highlight` : ""
              }`}
            >
              <Link href={warmUpsRoute} data-tooltip-id={warmUpsRoute}>
                <WarmupIcon />
              </Link>
              <Tooltip id={warmUpsRoute} content={"Warmups"} place="right" />
            </li>
            <li
              className={`cursor-pointer p-2 transition duration-300 ${
                pathname.startsWith(mailServersRoute) ? `bg-blue-highlight` : ""
              }`}
            >
              <Link href={mailServersRoute} data-tooltip-id={mailServersRoute}>
                <Link4 />
              </Link>
              <Tooltip
                id={mailServersRoute}
                content={"Mail Servers"}
                place="right"
              />
            </li>
            <li
              className={`cursor-pointer p-2 transition duration-300 ${
                pathname.startsWith(emailListsRoute) ? `bg-blue-highlight` : ""
              }`}
            >
              <Link href={emailListsRoute} data-tooltip-id={emailListsRoute}>
                <Link3 />
              </Link>
              <Tooltip
                id={emailListsRoute}
                content={"Email Lists"}
                place="right"
              />
            </li>
          </div>
          <li
            className={`cursor-pointer justify-self-end transition duration-300 p-2 ${
              pathname.startsWith(settingsRoute) ? `bg-blue-highlight` : ""
            }`}
          >
            <Link href={settingsRoute} data-tooltip-id={settingsRoute}>
              <Link6 />
            </Link>
            <Tooltip id={settingsRoute} content={"Settings"} place="right" />
          </li>
        </ul>
      </nav>

      {/* secondary navigation */}
      {SecSidebar && (
        <section
          className={`flex flex-col items-center gap-5 transition-all duration-300 ${
            isSidebarOpen ? "w-[15rem] p-5" : "w-[4rem] px-3 py-5"
          }`}
        >
          <h2
            className={`text-start w-full text-gray-800 text-xl line-clamp-1 font-bold ${
              isSidebarOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            {SecSidebar.title}
          </h2>
          <div className="flex justify-center w-full h-full">
            <SecSidebar.component />
          </div>
        </section>
      )}
    </section>
  );
};

export default Sidebar;
