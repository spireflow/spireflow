import { SpinnerIcon } from "../../assets/icons/SpinnerIcon";
import { useChangelogModal } from "./hooks/useChangelogModal";
import { ChangelogModalProps } from "./types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../components/common/shadcn/dialog";

export const ChangelogModal = ({ closeModal, returnFocusRef }: ChangelogModalProps) => {
  const { changelogContent, isLoading, error, formatMarkdown } =
    useChangelogModal();

  return (
    <Dialog open={true} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent
        className="max-w-[90vw] sm:max-w-[42rem] pt-12 sm:pt-12"
        onCloseAutoFocus={(e) => {
          if (returnFocusRef?.current) {
            e.preventDefault();
            returnFocusRef.current.focus();
          }
        }}
      >
        <DialogTitle className="sr-only">Changelog</DialogTitle>
        <div
          tabIndex={0}
          className="w-full min-w-0 md:min-w-[32rem] h-full max-h-[65vh] overflow-y-auto pr-4 -mt-4 focus:outline-none"
        >
          <div className="text-primaryText text-base w-full h-full text-left">
            {isLoading ? (
              <div className="flex justify-center items-center py-10 w-full h-full">
                <SpinnerIcon className="contentSpinner" />
              </div>
            ) : error ? (
              <div className="text-red-500 text-center py-5">{error}</div>
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: formatMarkdown(changelogContent),
                }}
                className="pb-4"
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
