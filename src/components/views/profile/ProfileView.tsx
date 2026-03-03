"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { GithubIcon } from "../../../assets/icons/GithubIcon";
import { LinkedinIcon } from "../../../assets/icons/LinkedinIcon";
import { PhoneIcon } from "../../../assets/icons/PhoneIcon";
import { TwitterIcon } from "../../../assets/icons/TwitterIcon";
import { Card } from "../../common/Card";
import { Switch } from "../../common/shadcn/switch";

export const ProfileView = () => {
  const t = useTranslations("profile");
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    role: "Administrator",
    joinDate: "January 2024",
    location: "San Francisco, CA",
    bio: "E-commerce enthusiast with a passion for data-driven insights and customer experience optimization.",
  });

  return (
    <div className="w-full flex flex-col gap-6 max-3xl:gap-5 max-2xl:gap-4">
      {/* Profile Header Card */}
      <Card className="!p-0 overflow-hidden">
        {/* Banner */}
        <div className="h-40 max-3xl:h-32 max-2xl:h-28 relative bg-profileHeaderBg">
          <div className="absolute -bottom-12 max-3xl:-bottom-10 left-1/2 -translate-x-1/2">
            <div className="w-24 h-24 max-3xl:w-20 max-3xl:h-20 rounded-full bg-primaryBg border-4 border-primaryBg flex items-center justify-center relative">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-chartSecondaryBg to-chartPrimaryBg dark:from-[rgb(20,60,50)] dark:to-[rgb(55,150,120)] flex items-center justify-center text-white text-2xl max-3xl:text-xl font-bold">
                {userData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-16 max-3xl:pt-12 max-2xl:pt-10 px-6 pb-4 max-3xl:pb-2 max-2xl:pb-1 max-md:pb-3 relative min-h-40 max-3xl:min-h-32.5 max-2xl:min-h-[7.1875rem] max-md:min-h-0">
          {/* Text info centered below avatar */}
          <div className="text-center">
            <h1 className="text-3xl max-3xl:text-2xl max-2xl:text-xl font-bold text-primaryText mb-1">
              {userData.name}
            </h1>
            <p className="text-secondaryText text-base max-2xl:text-sm mb-1">
              {userData.role}
            </p>
            <p className="text-subtitleText text-sm max-2xl:text-xs">
              {t("memberSince")} {userData.joinDate}
            </p>
          </div>

          {/* Social Links and Edit button */}
          <div className="md:absolute md:top-1/2 md:-translate-y-1/2 right-6 max-lg:left-6 max-lg:justify-between flex items-center gap-6 max-md:justify-center max-md:mt-8">
            <div className="flex gap-3">
              <button
                className="w-10 h-10 rounded-full bg-secondaryBg hover:bg-hoverBg flex items-center justify-center group"
                aria-label="GitHub profile"
              >
                <div className="w-5 h-5 flex items-center justify-center text-grayIcon group-hover:text-primaryText">
                  <GithubIcon />
                </div>
              </button>
              <button
                className="w-10 h-10 rounded-full bg-secondaryBg hover:bg-hoverBg flex items-center justify-center group"
                aria-label="LinkedIn profile"
              >
                <div className="w-4.5 h-4.5 flex items-center justify-center text-grayIcon group-hover:text-primaryText">
                  <LinkedinIcon />
                </div>
              </button>
              <button
                className="w-10 h-10 rounded-full bg-secondaryBg hover:bg-hoverBg flex items-center justify-center group"
                aria-label="Twitter profile"
              >
                <div className="w-4.5 h-4.5 flex items-center justify-center text-grayIcon group-hover:text-primaryText">
                  <TwitterIcon />
                </div>
              </button>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="max-md:hidden px-4 py-2 bg-containedButtonBg hover:bg-containedButtonBgHover text-white rounded-md transition-colors text-sm font-medium"
            >
              {isEditing ? t("saveChanges") : t("editProfile")}
            </button>
          </div>
        </div>
      </Card>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-3xl:gap-5 max-2xl:gap-4">
        {/* Left Column - Contact Info */}
        <div className="lg:col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 max-3xl:gap-5 max-2xl:gap-4">
          {/* Contact Information Card */}
          <Card className="!px-6">
            <h2 className="text-xl max-3xl:text-lg max-2xl:text-base font-semibold text-primaryText mb-6 max-3xl:mb-5 max-2xl:mb-4">
              {t("contactInformation")}
            </h2>
            <div className="space-y-5 max-2xl:space-y-4">
              <div className="flex items-start gap-4 max-2xl:gap-3">
                <div className="w-6 h-6 text-secondaryText mt-0.5">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-subtitleText mb-1">{t("email")}</p>
                  <p className="text-base max-xl:text-sm text-primaryText break-all">
                    {userData.email}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 max-2xl:gap-3">
                <div className="w-6 h-6 text-secondaryText mt-0.5">
                  <PhoneIcon />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-subtitleText mb-1">{t("phone")}</p>
                  <p className="text-base max-xl:text-sm text-primaryText">
                    {userData.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 max-2xl:gap-3">
                <div className="w-6 h-6 text-secondaryText mt-0.5">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-subtitleText mb-1">
                    {t("location")}
                  </p>
                  <p className="text-base max-xl:text-sm text-primaryText">
                    {userData.location}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 max-2xl:gap-3">
                <div className="w-6 h-6 text-secondaryText mt-0.5">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2v20M2 12h20" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-subtitleText mb-1">Department</p>
                  <p className="text-base max-xl:text-sm text-primaryText">
                    Sales & Marketing
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Stats Card */}
          <Card className="!px-6">
            <h2 className="text-xl max-3xl:text-lg max-2xl:text-base font-semibold text-primaryText mb-6 max-3xl:mb-5 max-2xl:mb-4">
              {t("quickStats")}
            </h2>
            <div className="space-y-5 max-2xl:space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-base max-xl:text-sm text-secondaryText">
                  {t("totalOrders")}
                </span>
                <span className="text-base max-xl:text-sm font-semibold text-primaryText">
                  1,284
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base max-xl:text-sm text-secondaryText">
                  {t("completedTasks")}
                </span>
                <span className="text-base max-xl:text-sm font-semibold text-primaryText">
                  847
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base max-xl:text-sm text-secondaryText">
                  {t("activeProjects")}
                </span>
                <span className="text-base max-xl:text-sm font-semibold text-primaryText">
                  12
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base max-xl:text-sm text-secondaryText">
                  Revenue Generated
                </span>
                <span className="text-base max-xl:text-sm font-semibold text-primaryText">
                  $245K
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base max-xl:text-sm text-secondaryText">
                  Team Members
                </span>
                <span className="text-base max-xl:text-sm font-semibold text-primaryText">
                  28
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base max-xl:text-sm text-secondaryText">
                  Satisfaction Rate
                </span>
                <span className="text-base max-xl:text-sm font-semibold text-primaryText">
                  98.5%
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Main Content */}
        <div className="lg:col-span-2 flex flex-col gap-6 max-3xl:gap-5 max-2xl:gap-4">
          {/* About Section Card */}
          <Card className="!px-6">
            <h2 className="text-xl max-3xl:text-lg max-2xl:text-base font-semibold text-primaryText mb-4 max-3xl:mb-3 max-2xl:mb-2">
              {t("about")}
            </h2>
            {isEditing ? (
              <textarea
                className="w-full h-24 px-3 py-2 bg-inputBg border border-inputBorder rounded-md text-primaryText text-base resize-none focus:border-inputBorderHover focus:outline-none"
                value={userData.bio}
                onChange={(e) =>
                  setUserData({ ...userData, bio: e.target.value })
                }
              />
            ) : (
              <p className="text-base max-xl:text-sm text-secondaryText leading-relaxed">
                {userData.bio}
              </p>
            )}
          </Card>

          {/* Account Settings Card */}
          <Card className="!px-6">
            <h2 className="text-xl max-3xl:text-lg max-2xl:text-base font-semibold text-primaryText mb-4 max-3xl:mb-3 max-2xl:mb-2">
              {t("accountSettings")}
            </h2>
            <div className="space-y-4 max-2xl:space-y-3">
              <div className="flex items-center justify-between py-3 border-b border-mainBorder">
                <div>
                  <p className="text-base max-xl:text-sm font-medium text-primaryText">
                    {t("emailNotifications")}
                  </p>
                  <p className="text-sm text-subtitleText mt-1">
                    {t("emailNotificationsDesc")}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-3 border-b border-mainBorder">
                <div>
                  <p className="text-base max-xl:text-sm font-medium text-primaryText">
                    {t("twoFactorAuth")}
                  </p>
                  <p className="text-sm text-subtitleText mt-1">
                    {t("twoFactorAuthDesc")}
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-base max-xl:text-sm font-medium text-primaryText">
                    Marketing Communications
                  </p>
                  <p className="text-sm text-subtitleText mt-1">
                    Receive updates about new features and promotions
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          {/* Recent Activity Card */}
          <Card className="!px-6">
            <h2 className="text-xl max-3xl:text-lg max-2xl:text-base font-semibold text-primaryText mb-4 max-3xl:mb-3 max-2xl:mb-2">
              {t("recentActivity")}
            </h2>
            <div className="space-y-3 max-2xl:space-y-2">
              {[
                {
                  action: "Updated product pricing",
                  time: "2 hours ago",
                  type: "update",
                },
                {
                  action: "Processed customer order #4521",
                  time: "5 hours ago",
                  type: "order",
                },
                {
                  action: "Added new product category",
                  time: "1 day ago",
                  type: "create",
                },
                {
                  action: "Generated monthly report",
                  time: "2 days ago",
                  type: "report",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 py-2 hover:bg-navItemBgHover rounded-md px-2 -mx-2 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-chartPrimaryBg mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-base max-xl:text-sm text-primaryText">
                      {activity.action}
                    </p>
                    <p className="text-sm text-subtitleText mt-0.5">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
