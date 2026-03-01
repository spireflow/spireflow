import { setRequestLocale } from "next-intl/server";

import { PageWrapper } from "../../../../components/common/PageWrapper";
import { ProfileView } from "../../../../components/views/profile/ProfileView";

const Profile = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageWrapper pageName="Profile">
      <ProfileView />
    </PageWrapper>
  );
};

export default Profile;
