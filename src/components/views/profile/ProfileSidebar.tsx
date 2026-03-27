import { useTranslations } from "next-intl";

import { PhoneIcon } from "../../../assets/icons/PhoneIcon";
import { Card, CardContent } from "../../common/shadcn/card";

type ProfileSidebarProps = {
  userData: {
    email: string;
    phone: string;
    location: string;
  };
};

export const ProfileSidebar = ({ userData }: ProfileSidebarProps) => {
  const t = useTranslations("profile");

  return (
    <div className="lg:col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 max-3xl:gap-5 max-2xl:gap-4">
      {/* Contact Information Card */}
      <Card>
        <CardContent>
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
        </CardContent>
      </Card>

      {/* Quick Stats Card */}
      <Card>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
};
