import { SpinnerIcon } from "../../assets/icons/SpinnerIcon";
import { useChangelogModal } from "./hooks/useChangelogModal";
import { ChangelogModalProps } from "./types";
import { Modal } from "../../components/common/Modal";

export const ChangelogModal = ({ closeModal }: ChangelogModalProps) => {
  const { changelogContent, isLoading, error, formatMarkdown } =
    useChangelogModal();

  return (
    <Modal onClose={closeModal} hasBlur={true} hasScrollContent={true}>
      <div className="w-full max-w-[42rem] min-w-0 md:min-w-[32rem] h-full md:h-[65vh] overflow-auto pr-4 -mt-4">
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
    </Modal>
  );
};
