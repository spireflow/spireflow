"use client";

import { useEffect } from "react";

const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error("Global error caught by boundary:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily:
            "'Outfit', 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          backgroundColor: "rgb(20, 23, 26)",
          color: "rgb(231, 233, 236)",
        }}
      >
        <main
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "4rem",
              height: "4rem",
              marginBottom: "1.5rem",
              color: "rgba(61, 185, 133, 0.8)",
            }}
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: "100%", height: "100%" }}
            >
              <path d="M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
              <path d="M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2" />
              <circle cx="6" cy="6" r="1" />
              <circle cx="6" cy="18" r="1" />
              <path d="m15.7 13.4-3.1-3.1" />
              <path d="m9.1 16.6 3.1 3.1" />
              <path d="m12.6 10.3 3.1 3.1" />
              <path d="m9.1 16.6 6.5-6.5" />
            </svg>
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: "9rem",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1,
              marginBottom: "1.5rem",
              color: "rgb(231, 233, 236)",
            }}
          >
            500
          </h1>
          <h2
            style={{
              margin: 0,
              fontSize: "1.5rem",
              fontWeight: 600,
              marginBottom: "0.75rem",
              color: "rgb(231, 233, 236)",
            }}
          >
            Something went wrong
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: "1rem",
              color: "rgb(201, 203, 207)",
              lineHeight: 1.6,
              marginBottom: "2.5rem",
              maxWidth: "24rem",
            }}
          >
            A critical error occurred while loading this page.
          </p>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              onClick={() => reset()}
              tabIndex={0}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "0.75rem",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                backgroundColor: "transparent",
                color: "rgb(231, 233, 236)",
                fontSize: "0.875rem",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            {/*
             * Using native anchor instead of next/link because global-error
             * replaces the entire root layout, so the Next.js router may not
             * be available in this context.
             */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              tabIndex={0}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "0.75rem",
                border: "none",
                backgroundColor: "rgb(54, 128, 96)",
                color: "rgb(255, 255, 255)",
                fontSize: "0.875rem",
                fontWeight: 500,
                textDecoration: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              Back to homepage
            </a>
          </div>
        </main>
      </body>
    </html>
  );
};

export default GlobalError;
