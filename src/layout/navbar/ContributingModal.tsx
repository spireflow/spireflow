import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/common/shadcn/dialog";
import { useModalKeyboardScroll } from "./hooks/useModalKeyboardScroll";
import { AboutModalProps } from "./types";

export const ContributingModal = ({ closeModal }: AboutModalProps) => {
  const { scrollRef, handleKeyDown, handleOpenAutoFocus } =
    useModalKeyboardScroll();

  return (
    <Dialog open={true} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent
        className="max-w-[90vw] sm:max-w-152 pt-0 sm:pt-0 md:pt-12 pb-0 md:pb-12"
        onOpenAutoFocus={handleOpenAutoFocus}
        onKeyDown={handleKeyDown}
      >
        <div
          ref={scrollRef}
          tabIndex={-1}
          className="w-full h-full max-h-none md:max-h-[60vh] overflow-y-auto pr-4 pt-12 md:pt-0 focus:outline-none focus-visible:outline-none"
        >
          <DialogHeader>
            <DialogTitle className="text-primaryText text-3xl w-full text-left mb-4">
              Contributing guide
            </DialogTitle>
          </DialogHeader>
          <DialogDescription asChild>
            <div className="text-primaryText text-base w-full text-left">
              <p className="mb-4">
                Hi there! 👋 Thanks for checking out this project.
                <br />
                Every form of contribution is valuable. Below are the main ways
                to get involved:
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">
                1. Share Feedback and Ideas 💡
              </h3>
              <ul className="list-disc list-inside mb-4 pl-3 text-primaryText">
                <li className="mb-2">
                  Use the{" "}
                  <a
                    href="https://github.com/matt765/spireflow/discussions/1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-mainColor hover:underline"
                  >
                    Discussions
                  </a>{" "}
                  on GitHub to share feedback, suggestions, or ideas for
                  improvement.
                </li>
                <li>
                  Open an{" "}
                  <a
                    href="https://github.com/matt765/spireflow/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-mainColor hover:underline"
                  >
                    Issue
                  </a>{" "}
                  if you&apos;ve found a bug or something doesn&apos;t work as
                  expected.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">
                2. Support Development 🔥
              </h3>
              <p className="mb-4">
                If you&apos;d like to support continued work on the project, you
                can do so through{" "}
                <a
                  href="https://github.com/sponsors/matt765"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mainColor hover:underline"
                >
                  GitHub Sponsors
                </a>
                .
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">
                3. Contribute code
              </h3>
              <p className="mb-4">
                Feel free to fork the repository and submit a merge requests. If
                you&apos;ve spotted something that can be improved or fixed,
                your input is more than welcome.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">
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
