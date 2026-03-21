import { useTranslations } from "next-intl";

import { GithubIcon } from "../../../assets/icons/GithubIcon";
import { LinkedinIcon } from "../../../assets/icons/LinkedinIcon";
import { TwitterIcon } from "../../../assets/icons/TwitterIcon";
import { Card } from "../../common/Card";

type ProfileHeaderCardProps = {
  userData: {
    name: string;
    role: string;
    joinDate: string;
  };
  isEditing: boolean;
  onToggleEdit: () => void;
};

export const ProfileHeaderCard = ({
  userData,
  isEditing,
  onToggleEdit,
}: ProfileHeaderCardProps) => {
  const t = useTranslations("profile");

  return (
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
      <div className="pt-16 max-3xl:pt-12 max-2xl:pt-14 px-6 pb-4 max-3xl:pb-2 max-2xl:pb-1 max-md:pb-3 relative min-h-40 max-3xl:min-h-32.5 max-2xl:min-h-[7.1875rem] max-md:min-h-0">
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
        <div className="md:absolute md:top-1/2 md:-translate-y-1/2 right-6 max-lg:left-6 max-lg:justify-between flex items-center gap-6 max-md:justify-center max-md:mt-6 max-md:-mb-2">
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
            onClick={onToggleEdit}
            className="max-md:hidden px-4 py-2 bg-containedButtonBg hover:bg-containedButtonBgHover text-white rounded-md transition-colors text-sm font-medium"
          >
            {isEditing ? t("saveChanges") : t("editProfile")}
          </button>
        </div>
      </div>
    </Card>
  );
};
