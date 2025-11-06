import { notFound } from "next/navigation";

export default function NotFoundCatch() {
  // This seems to be the only way to make the 404 page work with i18n
  // https://github.com/vercel/next.js/discussions/50518
  notFound();
}
