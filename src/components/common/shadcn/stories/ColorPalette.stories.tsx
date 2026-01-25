import React from "react";

const ColorSwatch = ({
  name,
  cssVar,
}: {
  name: string;
  cssVar: string;
}) => (
  <div className="flex items-center gap-3 mb-2">
    <div
      className="w-12 h-12 rounded-md border border-mainBorder"
      style={{ backgroundColor: `var(--color-${cssVar})` }}
    />
    <div>
      <div className="text-sm font-medium text-primaryText">{name}</div>
      <div className="text-xs text-secondaryText">--color-{cssVar}</div>
    </div>
  </div>
);

const ColorSection = ({
  title,
  colors,
}: {
  title: string;
  colors: { name: string; cssVar: string }[];
}) => (
  <div className="mb-8">
    <h3 className="text-lg font-semibold text-primaryText mb-4 border-b border-mainBorder pb-2">
      {title}
    </h3>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {colors.map((color) => (
        <ColorSwatch key={color.cssVar} {...color} />
      ))}
    </div>
  </div>
);

// Grupy kolorów 1:1 z light.css/dark.css
const colorGroups = {
  texts: [
    { name: "Primary Text", cssVar: "primaryText" },
    { name: "Secondary Text", cssVar: "secondaryText" },
    { name: "Subtitle Text", cssVar: "subtitleText" },
    { name: "Secondary Text Hover", cssVar: "secondaryTextHover" },
    { name: "Colored Text", cssVar: "coloredText" },
    { name: "Colored Text Hover", cssVar: "coloredTextHover" },
    { name: "Nav Item Text", cssVar: "navItemText" },
    { name: "Nav Item Text Active", cssVar: "navItemTextActive" },
    { name: "Nav Section Title", cssVar: "navSectionTitle" },
    { name: "Table Cell Text", cssVar: "tableCellText" },
    { name: "Table Row Bg Hover", cssVar: "tableRowBgHover" },
    { name: "Table Header Bg", cssVar: "tableHeaderBg" },
    { name: "Table Header Bg Hover", cssVar: "tableHeaderBgHover" },
    { name: "Green Badge Text", cssVar: "greenBadgeText" },
    { name: "Red Badge Text", cssVar: "redBadgeText" },
    { name: "Orange Badge Text", cssVar: "orangeBadgeText" },
    { name: "Percentage Badge Green Text", cssVar: "percentageBadgeGreenText" },
    { name: "Percentage Badge Red Text", cssVar: "percentageBadgeRedText" },
    { name: "Percentage Badge Green Text Accented", cssVar: "percentageBadgeGreenTextAccented" },
    { name: "Percentage Badge Red Text Accented", cssVar: "percentageBadgeRedTextAccented" },
    { name: "Logo Basic Text", cssVar: "logoBasicText" },
    { name: "Tab Line Active Text", cssVar: "tabLineActiveText" },
    { name: "Tab Line Active Text Hover", cssVar: "tabLineActiveTextHover" },
    { name: "Tab Line Inactive Text", cssVar: "tabLineInactiveText" },
    { name: "Tab Line Inactive Text Hover", cssVar: "tabLineInactiveTextHover" },
    { name: "Settings Drawer Label Text", cssVar: "settingsDrawerLabelText" },
    { name: "Settings Drawer Section Title", cssVar: "settingsDrawerSectionTitle" },
  ],
  icons: [
    { name: "Gray Icon", cssVar: "grayIcon" },
    { name: "Gray Icon Hover", cssVar: "grayIconHover" },
    { name: "Nav Item Icon Active", cssVar: "navItemIconActive" },
    { name: "Settings Icon", cssVar: "settingsIcon" },
    { name: "Calendar Icon Hover", cssVar: "calendarIconHover" },
    { name: "Settings Drawer Divider", cssVar: "settingsDrawerDivider" },
  ],
  backgrounds: [
    { name: "Primary Bg", cssVar: "primaryBg" },
    { name: "Secondary Bg", cssVar: "secondaryBg" },
    { name: "Asset Performance Bar Bg", cssVar: "assetPerformanceBarBg" },
    { name: "Tabs Bg", cssVar: "tabsBg" },
    { name: "Tab List Bg", cssVar: "tabListBg" },
    { name: "Tab Active Bg", cssVar: "tabActiveBg" },
    { name: "Revenue Tab Active Bg", cssVar: "revenueTabActiveBg" },
    { name: "Main Color", cssVar: "mainColor" },
    { name: "Progress Indicator", cssVar: "progressIndicator" },
    { name: "Navigation Bg", cssVar: "navigationBg" },
    { name: "Nav Item Bg", cssVar: "navItemBg" },
    { name: "Nav Item Bg Hover", cssVar: "navItemBgHover" },
    { name: "Nav Item Active Bg", cssVar: "navItemActiveBg" },
    { name: "Nav Item Active Bg Hover", cssVar: "navItemActiveBgHover" },
    { name: "Input Bg", cssVar: "inputBg" },
    { name: "Input Bg Hover", cssVar: "inputBgHover" },
    { name: "Toggle Switch Bg", cssVar: "toggleSwitchBg" },
    { name: "Pagination Active Bg", cssVar: "paginationActiveBg" },
    { name: "Button Active Bg", cssVar: "buttonActiveBg" },
    { name: "Outlined Button Bg", cssVar: "outlinedButtonBg" },
    { name: "Outlined Button Bg Hover", cssVar: "outlinedButtonBgHover" },
    { name: "Contained Button Bg", cssVar: "containedButtonBg" },
    { name: "Contained Button Bg Hover", cssVar: "containedButtonBgHover" },
    { name: "Dropdown Bg", cssVar: "dropdownBg" },
    { name: "Dropdown Bg Hover", cssVar: "dropdownBgHover" },
    { name: "Calendar Today Bg", cssVar: "calendarTodayBg" },
    { name: "Calendar List Day Header Bg", cssVar: "calendarListDayHeaderBg" },
    { name: "Chart Primary Bg", cssVar: "chartPrimaryBg" },
    { name: "Chart Secondary Bg", cssVar: "chartSecondaryBg" },
    { name: "Loader Bg", cssVar: "loaderBg" },
    { name: "Loader Circle Bg", cssVar: "loaderCircleBg" },
    { name: "Select Bg", cssVar: "selectBg" },
    { name: "Select Bg Hover", cssVar: "selectBgHover" },
    { name: "User Button Bg", cssVar: "userButtonBg" },
    { name: "Login Modal Bg", cssVar: "loginModalBg" },
    { name: "Navbar Button Bg", cssVar: "navbarButtonBg" },
    { name: "Navbar Button Bg Hover", cssVar: "navbarButtonBgHover" },
    { name: "Navbar Icon Button Bg Hover", cssVar: "navbarIconButtonBgHover" },
    { name: "Gallery Bg", cssVar: "galleryBg" },
    { name: "Gallery Thumbnail Bg", cssVar: "galleryThumbnailBg" },
    { name: "Datepicker Header Bg", cssVar: "datepickerHeaderBg" },
    { name: "Tooltip Bg", cssVar: "tooltipBg" },
    { name: "Scrollbar Bg", cssVar: "scrollbarBg" },
    { name: "Scrollbar Placeholder Bg", cssVar: "scrollbarPlaceholderBg" },
    { name: "Active Product Bg", cssVar: "activeProductBg" },
    { name: "Calendar Main Color", cssVar: "calendarMainColor" },
    { name: "Scrollbar Thumb", cssVar: "scrollbarThumb" },
    { name: "Theme Toggle Bg", cssVar: "themeToggleBg" },
    { name: "Theme Toggle Bg Hover", cssVar: "themeToggleBgHover" },
    { name: "Dropzone Bg", cssVar: "dropzoneBg" },
    { name: "Dropzone Bg Hover", cssVar: "dropzoneBgHover" },
    { name: "Theme Toggle Active Bg", cssVar: "themeToggleActiveBg" },
    { name: "Floating Menu Button Bg", cssVar: "floatingMenuButtonBg" },
    { name: "Floating Menu Button Bg Hover", cssVar: "floatingMenuButtonBgHover" },
    { name: "Percentage Badge Green Bg", cssVar: "percentageBadgeGreenBg" },
    { name: "Percentage Badge Red Bg", cssVar: "percentageBadgeRedBg" },
    { name: "Percentage Badge Green Border", cssVar: "percentageBadgeGreenBorder" },
    { name: "Percentage Badge Red Border", cssVar: "percentageBadgeRedBorder" },
    { name: "Modal Bg", cssVar: "modalBg" },
    { name: "Logo Bg", cssVar: "logoBg" },
    { name: "Chip Bg", cssVar: "chipBg" },
    { name: "Chip Bg Hover", cssVar: "chipBgHover" },
    { name: "Muted Bg", cssVar: "mutedBg" },
    { name: "Error Bg", cssVar: "errorBg" },
    { name: "Skeleton Bg", cssVar: "skeletonBg" },
    { name: "Navbar Search Input Bg", cssVar: "navbarSearchInputBg" },
    { name: "Navbar Search Input Bg Hover", cssVar: "navbarSearchInputBgHover" },
    { name: "Profile Header Bg", cssVar: "profileHeaderBg" },
    { name: "Settings Drawer Header Bg", cssVar: "settingsDrawerHeaderBg" },
    { name: "Settings Button Bg Hover", cssVar: "settingsButtonBgHover" },
    { name: "Settings Layout Preview Bg", cssVar: "settingsLayoutPreviewBg" },
    { name: "Notification Badge Bg", cssVar: "notificationBadgeBg" },
    { name: "Notification Badge Bg Hover", cssVar: "notificationBadgeBgHover" },
    { name: "Notification Item Bg", cssVar: "notificationItemBg" },
    { name: "Notification Item Bg Hover", cssVar: "notificationItemBgHover" },
    { name: "Notification Header Bg", cssVar: "notificationHeaderBg" },
  ],
  borders: [
    { name: "Main Border", cssVar: "mainBorder" },
    { name: "Main Border Hover", cssVar: "mainBorderHover" },
    { name: "Outlined Button Border", cssVar: "outlinedButtonBorder" },
    { name: "Input Border", cssVar: "inputBorder" },
    { name: "Input Border Hover", cssVar: "inputBorderHover" },
    { name: "Calendar Border", cssVar: "calendarBorder" },
    { name: "Card Border", cssVar: "cardBorder" },
    { name: "Theme Toggle Active Border", cssVar: "themeToggleActiveBorder" },
    { name: "Theme Toggle Border Hover", cssVar: "themeToggleBorderHover" },
    { name: "Theme Toggle Active Bg Hover", cssVar: "themeToggleActiveBgHover" },
    { name: "Map Country Border", cssVar: "mapCountryBorder" },
    { name: "Ring Border", cssVar: "ringBorder" },
    { name: "Checkbox Border", cssVar: "checkboxBorder" },
    { name: "Checkbox Border Disabled", cssVar: "checkboxBorderDisabled" },
    { name: "Navbar Search Input Border", cssVar: "navbarSearchInputBorder" },
    { name: "Navbar Search Input Border Hover", cssVar: "navbarSearchInputBorderHover" },
    { name: "Tab Line Active Border", cssVar: "tabLineActiveBorder" },
    { name: "Settings Button Border", cssVar: "settingsButtonBorder" },
  ],
};

const ColorPalette = ({ theme }: { theme: "light" | "dark" }) => (
  <div className={`${theme} p-6 bg-primaryBg rounded-lg min-h-screen`}>
    <h1 className="text-2xl font-bold text-primaryText mb-2">
      {theme === "light" ? "Light" : "Dark"} Mode Palette
    </h1>
    <p className="text-secondaryText mb-8">
      Color tokens used in {theme} theme
    </p>
    <ColorSection title="Texts" colors={colorGroups.texts} />
    <ColorSection title="Icons" colors={colorGroups.icons} />
    <ColorSection title="Backgrounds" colors={colorGroups.backgrounds} />
    <ColorSection title="Borders" colors={colorGroups.borders} />
  </div>
);

const meta = {
  title: "Theme/Color Palette",
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const LightMode = {
  render: () => <ColorPalette theme="light" />,
  parameters: {
    backgrounds: { default: "light" },
  },
  decorators: [
    (Story: React.ComponentType) => {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      return <Story />;
    },
  ],
};

export const DarkMode = {
  render: () => <ColorPalette theme="dark" />,
  parameters: {
    backgrounds: { default: "dark" },
  },
};
