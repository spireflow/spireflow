import { SpinnerIcon } from "../../assets/icons/SpinnerIcon";
import { useChangelogModal } from "./hooks/useChangelogModal";
import { useModalKeyboardScroll } from "./hooks/useModalKeyboardScroll";
import { ChangelogModalProps } from "./types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../../components/common/shadcn/dialog";

export const ChangelogModal = ({
  closeModal,
  returnFocusRef,
}: ChangelogModalProps) => {
  const { changelogContent, isLoading, error, formatMarkdown } =
    useChangelogModal();
  const { scrollRef, handleKeyDown, handleOpenAutoFocus } =
    useModalKeyboardScroll();

  return (
    <Dialog open={true} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent
        className="md:max-w-[42rem] px-5 xsm:px-5 sm:px-6 md:px-12 pr-0 xsm:pr-0 sm:pr-0 pt-0 sm:pt-0 md:pt-12 pb-0 md:pb-12"
        onOpenAutoFocus={handleOpenAutoFocus}
        onCloseAutoFocus={(e) => {
          if (returnFocusRef?.current) {
            e.preventDefault();
            returnFocusRef.current.focus();
          }
        }}
        onKeyDown={handleKeyDown}
      >
        <DialogTitle className="sr-only">Changelog</DialogTitle>
        <DialogDescription className="sr-only">Changelog</DialogDescription>
        <div
          ref={scrollRef}
          tabIndex={0}
          className="w-full min-w-0 md:min-w-[32rem] h-full max-h-none md:max-h-[65vh] overflow-y-auto pr-0 md:pr-4 [&>*]:pr-4 md:[&>*]:pr-0 pt-12 md:pt-0 focus:outline-none focus-visible:outline-none"
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
