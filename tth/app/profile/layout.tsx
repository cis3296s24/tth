import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/ui/sidebar-nav";

/**
 * Represents the metadata for the Profile Layout.
 */
export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

/**
 * Represents an item in the sidebar navigation.
 */
const sidebarNavItems = [
  {
    title: "Profile",
    href: "/profile",
  },
  // {
  //   title: "Account",
  //   href: "/profile/account",
  // },
  {
    title: "Post",
    href: "/profile/post",
  },
  {
    title: "Bought",
    href: "/profile/bought",
  },
  {
    title: "Sold Items",
    href: "/profile/sold",
  },
  {
    title: "Messaging",
    href: "/profile/messaging",
  },

  {
    title: "Logout",
    href: "/profile/logout",
  },

  // {
  //   title: "Notifications",
  //   href: "/examples/forms/notifications",
  // },
  // {
  //   title: "Display",
  //   href: "/examples/forms/display",
  // },
];

/**
 * Represents the props for the Profile Layout component.
 */
interface SettingsLayoutProps {
  /**
   * The children components to render within the layout.
   */
  children: React.ReactNode;
}

/**
 * Represents the Profile Layout.
 * @param children The children components to render within the layout.
 * @returns JSX.Element representing the Profile Layout.
 */
export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <div className="md:hidden">
        <Image
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Manage your account settings.</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12">
          <div className="flex-1 lg:max-w-2xl lg:order-2">{children}</div>
          <aside className="-mx-4 lg:w-1/5 lg:order-1">
            <SidebarNav items={sidebarNavItems} />
          </aside>
        </div>
      </div>
    </>
  );
}
