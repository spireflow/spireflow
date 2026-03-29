import { LogoIcon } from "@/assets/icons/LogoIcon";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Link } from "@/i18n/navigation";
import { useLayoutStore } from "@/store/layoutStore";
import { BREAKPOINTS } from "@/styles/breakpoints";

export const Logo = () => {
  const isSideMenuOpen = useLayoutStore((s) => s.isSideMenuOpen);
  const isDesktop = useMediaQuery(`(min-width: ${BREAKPOINTS.xl}px)`);

  const isCollapsed = !isSideMenuOpen && isDesktop;

  return (
    <Link
      href="/"
      tabIndex={0}
      ref={(el: HTMLAnchorElement | null) => {
        if (el) el.setAttribute("tabindex", "0");
      }}
      aria-label="Nellavio - home"
      className="flex items-center text-2xl xl:text-xl 1xl:text-[1.3rem] 3xl:text-[1.4rem] font-medium"
    >
      <div className="menuItemLogo text-logoBg flex-shrink-0 transition-all duration-200">
        <LogoIcon />
      </div>

      <div
        className={`flex whitespace-nowrap overflow-hidden transition-all duration-200 ease-in-out ${
          isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
        }`}
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        <div className="ml-[0.7rem] xl:ml-[0.55rem] text-logoBasicText mr-px tracking-wider">
          Nellavio
        </div>
      </div>
    </Link>
  );
};
