import { useEffect, useState } from "react";

/**
 * Fetches the CHANGELOG.md from the GitHub repo on mount
 * and provides a lightweight markdown-to-HTML formatter for display.
 */
export const useChangelogModal = () => {
  const [changelogContent, setChangelogContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChangelog = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/matt765/spireflow/main/CHANGELOG.md",
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

  /** Escapes HTML special characters to prevent XSS when injecting via dangerouslySetInnerHTML. */
  const escapeHtml = (text: string) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  /**
   * Lightweight markdown-to-HTML converter. Handles headings (#, ##, ###),
   * list items (- ), fenced code blocks (```), and plain paragraphs.
   * Iterates line-by-line; for code blocks the loop index is advanced
   * manually until the closing fence is found.
   */
  const formatMarkdown = (text: string) => {
    const lines = text.split("\n");
    let formattedContent = "";

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith("# ")) {
        formattedContent += `<h2 class="text-primaryText text-primaryText text-3xl w-full text-left mb-4">${escapeHtml(
          line.substring(2),
        )}</h2>`;
      } else if (line.startsWith("## ")) {
        formattedContent += `<p class="text-left w-full mt-4 text-xl text-secondaryText text-secondaryText">${escapeHtml(
          line.substring(3),
        )}</p>`;
      } else if (line.startsWith("### ")) {
        formattedContent += `<p class="text-secondaryText text-secondaryText mb-2 mt-4">${escapeHtml(
          line.substring(4),
        )}</p>`;
      } else if (line.startsWith("- ")) {
        formattedContent += `<li class="list-disc list-inside pl-3 text-primaryText text-primaryText">${escapeHtml(
          line.substring(2),
        )}</li>`;
      } else if (line.startsWith("```")) {
        formattedContent += `<div class="bg-gray-100 bg-gray-800 p-2 rounded my-2 font-mono text-sm">`;
        i++;
        while (i < lines.length && !lines[i].startsWith("```")) {
          formattedContent += `${escapeHtml(lines[i])}<br/>`;
          i++;
        }
        formattedContent += `</div>`;
      } else if (line.trim() === "") {
        formattedContent += `<div class="my-2"></div>`;
      } else {
        formattedContent += `<p class="mb-4 text-base text-primaryText text-primaryText">${escapeHtml(line)}</p>`;
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
