import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { PageWrapper } from "@/components/common/PageWrapper";
import { UserManagementView } from "@/components/views/userManagement/UserManagementView";

const UserManagement = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageWrapper pageName="User Management">
      <UserManagementView />
    </PageWrapper>
  );
};

export const metadata: Metadata = { title: "User Management" };

export default UserManagement;
