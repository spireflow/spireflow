import { useState, useEffect } from "react";

export const useChangelogModal = () => {
  const [changelogContent, setChangelogContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChangelog = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/matt765/spireflow/main/CHANGELOG.md"
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch changelog: ${response.status}`);
        }

        const content = await response.text();
        setChangelogContent(content);
        setIsLoading(false);
      } catch (err: unknown) {
        console.error("Error fetching changelog:", err);
        setError("Failed to load changelog. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchChangelog();
  }, []);

  // Simple function to format markdown content with basic HTML
  const formatMarkdown = (text: string) => {
    // Split content into lines
    const lines = text.split("\n");
    let formattedContent = "";

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Handle headings
      if (line.startsWith("# ")) {
        formattedContent += `<h2 class="text-primaryText text-primaryText text-3xl w-full text-left mt-2 mb-4">${line.substring(
          2
        )}</h2>`;
      } else if (line.startsWith("## ")) {
        formattedContent += `<p class="text-left w-full mt-4 text-xl text-secondaryText text-secondaryText">${line.substring(
          3
        )}</p>`;
      } else if (line.startsWith("### ")) {
        formattedContent += `<p class="text-secondaryText text-secondaryText mb-2 mt-4">${line.substring(
          4
        )}</p>`;
        // Handle list items
      } else if (line.startsWith("- ")) {
        formattedContent += `<li class="list-disc list-inside pl-3 text-primaryText text-primaryText">${line.substring(
          2
        )}</li>`;
        // Handle code blocks (simple version)
      } else if (line.startsWith("```")) {
        formattedContent += `<div class="bg-gray-100 bg-gray-800 p-2 rounded my-2 font-mono text-sm">`;
        i++; // Skip the opening ```
        while (i < lines.length && !lines[i].startsWith("```")) {
          formattedContent += `${lines[i]}<br/>`;
          i++;
        }
        formattedContent += `</div>`;
        // Handle empty lines
      } else if (line.trim() === "") {
        formattedContent += `<div class="my-2"></div>`;
        // Regular text
      } else {
        formattedContent += `<p class="mb-4 text-base text-primaryText text-primaryText">${line}</p>`;
      }
    }

    return formattedContent;
  };

  return {
    changelogContent,
    isLoading,
    error,
    formatMarkdown,
  };
};
