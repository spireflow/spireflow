import React, { useState } from "react";
import Link from "next/link";

import { GithubIcon } from "../../assets/icons/GithubIcon";
import { OutlinedButton } from "../../components/common/OutlinedButton";
import { AboutModalProps } from "./types";
import { Modal } from "../../components/common/Modal";

export const AboutModal = ({ closeModal }: AboutModalProps) => {
  const [isContributingModalOpen, setIsContributingModalOpen] = useState(false);

  return (
    <Modal onClose={closeModal} hasBlur={true} hasScrollContent={true}>
      {!isContributingModalOpen ? (
        <div className="w-full max-w-[32rem] h-full md:h-[65vh] overflow-auto pr-4">
          <h2 className="text-primaryText text-3xl w-full text-left mb-4">
            About
          </h2>
          <div className="text-primaryText text-base w-full text-left">
            <p className="mb-4 text-base">
              Spireflow is an open source and free dashboard starter template,
              written in NextJS and TypeScript. It is connected to NodeJS
              backend with PostgreSQL database containing data for a fictional
              electronic store.
            </p>
            <p className="mb-4 text-base">
              If you&apos;d like to contribute, check out the{" "}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsContributingModalOpen(true);
                }}
                className="text-mainColor hover:underline font-medium"
              >
                Contributing guide
              </button>
              .
            </p>
          </div>
          <div className="flex flex-row justify-start w-full mt-3 text-base gap-3 sm:gap-4 sm:h-12 mb-4">
            <Link
              href="https://github.com/matt765/spireflow"
              className="text-primaryText flex-1 xsm:flex-initial xsm:w-auto"
              target="_blank"
            >
              <OutlinedButton
                text="Front-end"
                icon={<GithubIcon />}
                className="sm:!px-6"
              />
            </Link>
            <Link
              href="https://github.com/matt765/spireflow-backend"
              className="text-primaryText flex-1 xsm:flex-initial xsm:w-auto"
              target="_blank"
            >
              <OutlinedButton
                text="Back-end"
                icon={<GithubIcon />}
                className="sm:!px-6"
              />
            </Link>
          </div>
          <div className="text-primaryText text-base w-full text-left">
            <p className="text-left w-full mt-4 text-xl">Tech stack:</p>
            <div className="mt-4">
              <p className="text-secondaryText mb-2">Front-End:</p>
            </div>
            <ul className="list-disc list-inside mb-4 pl-3 text-primaryText">
              <li>ReactJS</li>
              <li>NextJS</li>
              <li>TypeScript</li>
              <li>Tailwind</li>
              <li>Shadcn</li>
              <li>Zustand</li>
              <li>Apollo Client</li>
              <li>Recharts</li>
              <li>Better-Auth</li>
              <li>Jest</li>
            </ul>
            <div>
              <p className="text-secondaryText mb-2">Back-End:</p>
            </div>
            <ul className="list-disc list-inside pl-3 mb-4">
              <li>NodeJS</li>
              <li>Fastify</li>
              <li>PostgreSQL</li>
              <li>Prisma</li>
              <li>Better-Auth</li>
              <li>GraphQL</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-[32rem] h-full md:h-[65vh] overflow-y-auto pr-4">
          <h2 className="text-primaryText text-3xl w-full text-left mb-4">
            Contributing guide
          </h2>
          <div className="text-primaryText text-base w-full text-left">
            <p className="mb-4">
              Hi there! 👋 Thanks for checking out this project.
              <br />
              Every form of contribution is valuable. Below are the main ways to
              get involved:
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
              you&apos;ve spotted something that can be improved or fixed, your
              input is more than welcome.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">
              License Information for Contributors
            </h3>
            <p className="mb-4">
              By submitting a contribution to this project, you agree that your
              contributions are licensed under the MIT License.
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
};
