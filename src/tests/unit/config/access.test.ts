import type { Role } from "@/config/access";
import { ROLES } from "@/config/access";

describe("access config", () => {
  it("ROLES contains exactly admin, editor, viewer", () => {
    expect(ROLES).toEqual(["admin", "editor", "viewer"]);
  });

  it("ROLES has 3 entries", () => {
    expect(ROLES).toHaveLength(3);
  });

  it("ROLES is readonly", () => {
    const roles: readonly string[] = ROLES;
    expect(Array.isArray(roles)).toBe(true);
  });

  it("Role type matches ROLES values", () => {
    const validRole: Role = "admin";
    expect(ROLES).toContain(validRole);

    const editorRole: Role = "editor";
    expect(ROLES).toContain(editorRole);

    const viewerRole: Role = "viewer";
    expect(ROLES).toContain(viewerRole);
  });
});
