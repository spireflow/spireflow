import { act, renderHook, waitFor } from "@testing-library/react";

import { useRbacStore } from "@/store/rbacStore";

interface MockSession {
  data: { user: Record<string, unknown> } | null;
  isPending: boolean;
  error: null;
}

const mockUseSession = vi.fn(
  (): MockSession => ({
    data: null,
    isPending: false,
    error: null,
  }),
);

vi.mock("@/services/auth/auth-client", () => ({
  signIn: { email: vi.fn() },
  signUp: { email: vi.fn() },
  signOut: vi.fn(),
  useSession: () => mockUseSession(),
}));

const mockIsPresentationModeClient = vi.fn(() => true);

vi.mock("@/utils/presentationMode", () => ({
  isPresentationModeClient: () => mockIsPresentationModeClient(),
}));

const initialStoreState = useRbacStore.getState();

describe("useUserManagement", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useRbacStore.setState(initialStoreState);
    mockIsPresentationModeClient.mockReturnValue(true);
    mockUseSession.mockReturnValue({
      data: null,
      isPending: false,
      error: null,
    });
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const loadHook = async () => {
    vi.resetModules();
    const { useUserManagement } =
      await import("@/components/views/userManagement/useUserManagement");
    return renderHook(() => useUserManagement());
  };

  describe("demo mode", () => {
    it("returns store users in demo mode", async () => {
      const { result } = await loadHook();

      await waitFor(() => {
        expect(result.current.isDemo).toBe(true);
      });

      expect(result.current.users).toEqual(useRbacStore.getState().users);
    });

    it("is authorized in demo mode", async () => {
      const { result } = await loadHook();

      await waitFor(() => {
        expect(result.current.isDemo).toBe(true);
      });

      expect(result.current.isAuthorized).toBe(true);
    });

    it("is not loading after mount in demo mode", async () => {
      const { result } = await loadHook();

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it("currentUserRole defaults to admin from store", async () => {
      const { result } = await loadHook();

      await waitFor(() => {
        expect(result.current.isDemo).toBe(true);
      });

      expect(result.current.currentUserRole).toBe("admin");
    });

    it("setUserRole updates store in demo mode", async () => {
      const { result } = await loadHook();

      await waitFor(() => {
        expect(result.current.isDemo).toBe(true);
      });

      const success = await act(async () => {
        return result.current.setUserRole("usr_3", "editor");
      });

      expect(success).toBe(true);
      const updated = result.current.users.find((u) => u.id === "usr_3");
      expect(updated?.role).toBe("editor");
    });

    it("setUserName updates store in demo mode", async () => {
      const { result } = await loadHook();

      await waitFor(() => {
        expect(result.current.isDemo).toBe(true);
      });

      const success = await act(async () => {
        return result.current.setUserName("usr_2", "Demo Name");
      });

      expect(success).toBe(true);
      const updated = result.current.users.find((u) => u.id === "usr_2");
      expect(updated?.name).toBe("Demo Name");
    });

    it("currentUserId is null when session has no user", async () => {
      const { result } = await loadHook();

      await waitFor(() => {
        expect(result.current.isDemo).toBe(true);
      });

      expect(result.current.currentUserId).toBeNull();
    });

    it("does not call fetch in demo mode", async () => {
      await loadHook();

      await waitFor(() => {
        expect(fetch).not.toHaveBeenCalled();
      });
    });
  });

  describe("real mode", () => {
    beforeEach(() => {
      mockIsPresentationModeClient.mockReturnValue(false);
      process.env.NEXT_PUBLIC_AUTH_URL = "http://localhost:3000/api/auth";
    });

    afterEach(() => {
      delete process.env.NEXT_PUBLIC_AUTH_URL;
    });

    it("returns isDemo false in real mode", async () => {
      mockUseSession.mockReturnValue({
        data: { user: { id: "real_1", role: "admin" } },
        isPending: false,
        error: null,
      });
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ users: [], total: 0 }),
      } as Response);

      const { result } = await loadHook();

      await waitFor(() => {
        expect(result.current.isDemo).toBe(false);
      });
    });

    it("uses session role as currentUserRole", async () => {
      mockUseSession.mockReturnValue({
        data: { user: { id: "real_1", role: "editor" } },
        isPending: false,
        error: null,
      });

      const { result } = await loadHook();

      await waitFor(() => {
        expect(result.current.isDemo).toBe(false);
      });

      expect(result.current.currentUserRole).toBe("editor");
    });

    it("defaults to viewer when session user has no role", async () => {
      mockUseSession.mockReturnValue({
        data: { user: { id: "real_1" } },
        isPending: false,
        error: null,
      });

      const { result } = await loadHook();

      await waitFor(() => {
        expect(result.current.isDemo).toBe(false);
      });

      expect(result.current.currentUserRole).toBe("viewer");
    });

    it("fetches users when admin in real mode", async () => {
      mockUseSession.mockReturnValue({
        data: { user: { id: "real_1", role: "admin" } },
        isPending: false,
        error: null,
      });
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({
          users: [
            {
              id: "u1",
              name: "Test",
              email: "t@t.com",
              role: "admin",
              banned: false,
              banReason: null,
              banExpires: null,
              createdAt: "2025-01-01",
            },
          ],
          total: 1,
        }),
      } as Response);

      const { result } = await loadHook();

      await waitFor(() => {
        expect(result.current.users).toHaveLength(1);
      });

      expect(result.current.users[0].name).toBe("Test");
    });

    it("sets rejected when fetch returns 403", async () => {
      mockUseSession.mockReturnValue({
        data: { user: { id: "real_1", role: "admin" } },
        isPending: false,
        error: null,
      });
      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        status: 403,
        json: async () => ({ message: "Forbidden" }),
      } as Response);

      const { result } = await loadHook();

      await waitFor(() => {
        expect(result.current.isAuthorized).toBe(false);
      });
    });

    it("does not fetch users when role is not admin", async () => {
      mockUseSession.mockReturnValue({
        data: { user: { id: "real_1", role: "viewer" } },
        isPending: false,
        error: null,
      });

      await loadHook();

      await waitFor(() => {
        expect(fetch).not.toHaveBeenCalled();
      });
    });

    it("returns currentUserId from session", async () => {
      mockUseSession.mockReturnValue({
        data: { user: { id: "real_42", role: "admin" } },
        isPending: false,
        error: null,
      });
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({ users: [], total: 0 }),
      } as Response);

      const { result } = await loadHook();

      await waitFor(() => {
        expect(result.current.currentUserId).toBe("real_42");
      });
    });

    it("setUserRole calls admin API in real mode", async () => {
      mockUseSession.mockReturnValue({
        data: { user: { id: "real_1", role: "admin" } },
        isPending: false,
        error: null,
      });
      vi.mocked(fetch)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            users: [
              {
                id: "u1",
                name: "Test",
                email: "t@t.com",
                role: "editor",
                banned: false,
                banReason: null,
                banExpires: null,
                createdAt: "2025-01-01",
              },
            ],
            total: 1,
          }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({}),
        } as Response);

      const { result } = await loadHook();

      await waitFor(() => {
        expect(result.current.users).toHaveLength(1);
      });

      const success = await act(async () => {
        return result.current.setUserRole("u1", "admin");
      });

      expect(success).toBe(true);
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/api/auth/admin/set-role",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ userId: "u1", role: "admin" }),
        }),
      );
    });

    it("setUserName calls admin API in real mode", async () => {
      mockUseSession.mockReturnValue({
        data: { user: { id: "real_1", role: "admin" } },
        isPending: false,
        error: null,
      });
      vi.mocked(fetch)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            users: [
              {
                id: "u1",
                name: "Old",
                email: "t@t.com",
                role: "editor",
                banned: false,
                banReason: null,
                banExpires: null,
                createdAt: "2025-01-01",
              },
            ],
            total: 1,
          }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({}),
        } as Response);

      const { result } = await loadHook();

      await waitFor(() => {
        expect(result.current.users).toHaveLength(1);
      });

      const success = await act(async () => {
        return result.current.setUserName("u1", "New Name");
      });

      expect(success).toBe(true);
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/api/auth/admin/update-user",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ userId: "u1", data: { name: "New Name" } }),
        }),
      );
    });

    it("setUserRole returns false on API error", async () => {
      mockUseSession.mockReturnValue({
        data: { user: { id: "real_1", role: "admin" } },
        isPending: false,
        error: null,
      });
      vi.mocked(fetch)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ users: [], total: 0 }),
        } as Response)
        .mockResolvedValueOnce({
          ok: false,
          status: 500,
          json: async () => ({ message: "Server error" }),
        } as Response);

      const { result } = await loadHook();

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const success = await act(async () => {
        return result.current.setUserRole("u1", "admin");
      });

      expect(success).toBe(false);
    });

    it("setUserName returns false on API error", async () => {
      mockUseSession.mockReturnValue({
        data: { user: { id: "real_1", role: "admin" } },
        isPending: false,
        error: null,
      });
      vi.mocked(fetch)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ users: [], total: 0 }),
        } as Response)
        .mockResolvedValueOnce({
          ok: false,
          status: 500,
          json: async () => ({ message: "Server error" }),
        } as Response);

      const { result } = await loadHook();

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const success = await act(async () => {
        return result.current.setUserName("u1", "New");
      });

      expect(success).toBe(false);
    });
  });
});
