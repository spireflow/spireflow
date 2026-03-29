import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/common/shadcn/dialog";

import { useModalKeyboardScroll } from "../hooks/useModalKeyboardScroll";
import { AboutModalProps } from "../types";

export const ContributingModal = ({
  closeModal,
  returnFocusRef,
}: AboutModalProps) => {
  const { scrollRef, handleKeyDown, handleOpenAutoFocus } =
    useModalKeyboardScroll();

  return (
    <Dialog open={true} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent
        className="md:max-w-130 md:w-130 1xl:w-152 1xl:max-w-152 px-5 xsm:px-5 sm:px-6 md:px-10 1xl:px-12 pr-0 xsm:pr-0 sm:pr-0 pt-0 sm:pt-0 md:pt-10 1xl:pt-12 pb-0 md:pb-10 1xl:pb-12"
        onOpenAutoFocus={handleOpenAutoFocus}
        onCloseAutoFocus={(e) => {
          if (returnFocusRef?.current) {
            e.preventDefault();
            returnFocusRef.current.focus();
          }
        }}
        onKeyDown={handleKeyDown}
      >
        <div
          ref={scrollRef}
          tabIndex={-1}
          className="w-full h-full max-h-none md:max-h-[65vh] overflow-y-auto pl-1 pr-0 md:pr-4 [&>*]:pr-4 md:[&>*]:pr-0 pt-12 md:pt-0 focus:outline-none focus-visible:outline-none"
        >
          <DialogHeader>
            <DialogTitle className="text-primaryText text-3xl md:text-2xl 1xl:text-3xl w-full text-left mb-4">
              Contributing guide
            </DialogTitle>
          </DialogHeader>
          <DialogDescription asChild>
            <div className="text-primaryText text-base md:text-sm 1xl:text-base w-full text-left">
              <p className="mb-4">
                Hi there! 👋 Thanks for checking out this project.
                <br />
                Every form of contribution is valuable. Below are the main ways
                to get involved:
              </p>

              <h3 className="text-xl md:text-lg 1xl:text-xl font-semibold mt-6 mb-3">
                1. Share Feedback and Ideas 💡
              </h3>
              <ul className="list-disc list-inside mb-4 pl-3 text-primaryText">
                <li className="mb-2">
                  Use the{" "}
                  <a
                    href="https://github.com/nellavio/nellavio/discussions/1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-coloredLinkText hover:underline"
                  >
                    Discussions
                  </a>{" "}
                  on GitHub to share feedback, suggestions, or ideas for
                  improvement.
                </li>
                <li>
                  Open an{" "}
                  <a
                    href="https://github.com/nellavio/nellavio/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-coloredLinkText hover:underline"
                  >
                    Issue
                  </a>{" "}
                  if you&apos;ve found a bug or something doesn&apos;t work as
                  expected.
                </li>
              </ul>

              <h3 className="text-xl md:text-lg 1xl:text-xl font-semibold mt-6 mb-3">
                2. Support Development 🔥
              </h3>
              <p className="mb-4">
                If you&apos;d like to support continued work on the project, you
                can do so through{" "}
                <a
                  href="https://github.com/sponsors/matt765"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-coloredLinkText hover:underline"
                >
                  GitHub Sponsors
                </a>
                .
              </p>

              <h3 className="text-xl md:text-lg 1xl:text-xl font-semibold mt-6 mb-3">
                3. Contribute code
              </h3>
              <p className="mb-4">
                Feel free to fork the repository and submit a merge requests. If
                you&apos;ve spotted something that can be improved or fixed,
                your input is more than welcome.
              </p>

              <p className="mb-4">
                For more details on development setup, code conventions, and the
                pull request process, check out the{" "}
                <a
                  href="https://github.com/nellavio/nellavio/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-coloredLinkText hover:underline"
                >
                  CONTRIBUTING.md
                </a>{" "}
                on GitHub.
              </p>

              <h3 className="text-xl md:text-lg 1xl:text-xl font-semibold mt-6 mb-3">
                License Information for Contributors
              </h3>
              <p className="mb-4">
                By submitting a contribution to this project, you agree that
                your contributions are licensed under the MIT License.
              </p>
            </div>
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
};
