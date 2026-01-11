"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { Card } from "../../common/Card";
import { PhoneIcon } from "../../../assets/icons/PhoneIcon";
import { GithubIcon } from "../../../assets/icons/GithubIcon";
import { LinkedinIcon } from "../../../assets/icons/LinkedinIcon";
import { TwitterIcon } from "../../../assets/icons/TwitterIcon";

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
    <div className="w-full flex flex-col gap-6">
      {/* Profile Header Card */}
      <Card className="!p-0 overflow-hidden">
        {/* Banner */}
        <div className="h-40 relative bg-profileHeaderBg">
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
            <div className="w-24 h-24 rounded-full bg-primaryBg border-4 border-primaryBg flex items-center justify-center relative">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-chartSecondaryBg to-chartPrimaryBg dark:from-[rgb(20,60,50)] dark:to-[rgb(55,150,120)] flex items-center justify-center text-white text-2xl font-bold">
                {userData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div
          className="pt-16 px-6 pb-4 relative"
          style={{ minHeight: "160px" }}
        >
          {/* Social Links and Edit button - vertically centered in gray area */}
          <div className="absolute top-1/2 -translate-y-1/2 right-6 flex items-center gap-6">
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full bg-secondaryBg hover:bg-hoverBg flex items-center justify-center group">
                <div className="w-5 h-5 flex items-center justify-center text-grayIcon group-hover:text-primaryText">
                  <GithubIcon />
                </div>
              </button>
              <button className="w-10 h-10 rounded-full bg-secondaryBg hover:bg-hoverBg flex items-center justify-center group">
                <div className="w-[18px] h-[18px] flex items-center justify-center text-grayIcon group-hover:text-primaryText">
                  <LinkedinIcon />
                </div>
              </button>
              <button className="w-10 h-10 rounded-full bg-secondaryBg hover:bg-hoverBg flex items-center justify-center group">
                <div className="w-[18px] h-[18px] flex items-center justify-center text-grayIcon group-hover:text-primaryText">
                  <TwitterIcon />
                </div>
              </button>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-containedButtonBg hover:bg-containedButtonBgHover text-white rounded-md transition-colors text-sm font-medium"
            >
              {isEditing ? t("saveChanges") : t("editProfile")}
            </button>
          </div>

          {/* Text info centered below avatar */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primaryText mb-1">
              {userData.name}
            </h1>
            <p className="text-secondaryText text-base mb-1">{userData.role}</p>
            <p className="text-subtitleText text-sm">
              {t("memberSince")} {userData.joinDate}
            </p>
          </div>
        </div>
      </Card>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Contact Info */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Contact Information Card */}
          <Card className="!px-6">
            <h2 className="text-xl font-semibold text-primaryText mb-6">
              {t("contactInformation")}
            </h2>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 text-secondaryText mt-0.5">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-subtitleText mb-1">{t("email")}</p>
                  <p className="text-base text-primaryText break-all">
                    {userData.email}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 text-secondaryText mt-0.5">
                  <PhoneIcon />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-subtitleText mb-1">{t("phone")}</p>
                  <p className="text-base text-primaryText">{userData.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
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
                  <p className="text-base text-primaryText">
                    {userData.location}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
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
                  <p className="text-base text-primaryText">
                    Sales & Marketing
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Stats Card */}
          <Card className="!px-6">
            <h2 className="text-xl font-semibold text-primaryText mb-6">
              {t("quickStats")}
            </h2>
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <span className="text-base text-secondaryText">
                  {t("totalOrders")}
                </span>
                <span className="text-base font-semibold text-primaryText">
                  1,284
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-secondaryText">
                  {t("completedTasks")}
                </span>
                <span className="text-base font-semibold text-primaryText">
                  847
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-secondaryText">
                  {t("activeProjects")}
                </span>
                <span className="text-base font-semibold text-primaryText">
                  12
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-secondaryText">
                  Revenue Generated
                </span>
                <span className="text-base font-semibold text-primaryText">
                  $245K
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-secondaryText">
                  Team Members
                </span>
                <span className="text-base font-semibold text-primaryText">
                  28
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-secondaryText">
                  Satisfaction Rate
                </span>
                <span className="text-base font-semibold text-primaryText">
                  98.5%
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Main Content */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* About Section Card */}
          <Card className="!px-6">
            <h2 className="text-xl font-semibold text-primaryText mb-4">
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
              <p className="text-base text-secondaryText leading-relaxed">
                {userData.bio}
              </p>
            )}
          </Card>

          {/* Account Settings Card */}
          <Card className="!px-6">
            <h2 className="text-xl font-semibold text-primaryText mb-4">
              {t("accountSettings")}
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-mainBorder">
                <div>
                  <p className="text-base font-medium text-primaryText">
                    {t("emailNotifications")}
                  </p>
                  <p className="text-sm text-subtitleText mt-1">
                    {t("emailNotificationsDesc")}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-toggleSwitchBg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-mainBorder after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-chartPrimaryBg"></div>
                </label>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-mainBorder">
                <div>
                  <p className="text-base font-medium text-primaryText">
                    {t("twoFactorAuth")}
                  </p>
                  <p className="text-sm text-subtitleText mt-1">
                    {t("twoFactorAuthDesc")}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-toggleSwitchBg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-mainBorder after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-chartPrimaryBg"></div>
                </label>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-base font-medium text-primaryText">
                    Marketing Communications
                  </p>
                  <p className="text-sm text-subtitleText mt-1">
                    Receive updates about new features and promotions
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-toggleSwitchBg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-mainBorder after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-chartPrimaryBg"></div>
                </label>
              </div>
            </div>
          </Card>

          {/* Recent Activity Card */}
          <Card className="!px-6">
            <h2 className="text-xl font-semibold text-primaryText mb-4">
              {t("recentActivity")}
            </h2>
            <div className="space-y-3">
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
                  className="flex items-start gap-3 py-2 hover:bg-navItemBgHover rounded-md px-2 -mx-2 transition-colors cursor-pointer"
                >
                  <div className="w-2 h-2 rounded-full bg-chartPrimaryBg mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-base text-primaryText">
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
