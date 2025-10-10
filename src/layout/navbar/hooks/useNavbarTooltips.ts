import { useTooltip } from "../../../hooks/useTooltip";

export const useNavbarTooltips = () => {
  const themeTooltip = useTooltip();
  const languageTooltip = useTooltip();
  const userTooltip = useTooltip();
  const notificationsTooltip = useTooltip();

  return {
    themeTooltip,
    languageTooltip,
    userTooltip,
    notificationsTooltip,
  };
};
