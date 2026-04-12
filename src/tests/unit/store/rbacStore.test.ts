import { useRbacStore } from "@/store/rbacStore";

const initialState = useRbacStore.getState();

describe("rbacStore", () => {
  beforeEach(() => {
    useRbacStore.setState(initialState);
  });

  it("has 18 mock users by default", () => {
    expect(useRbacStore.getState().users).toHaveLength(18);
  });

  it("has currentUserRole set to admin by default", () => {
    expect(useRbacStore.getState().currentUserRole).toBe("admin");
  });

  it("each user has required fields", () => {
    const user = useRbacStore.getState().users[0];
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("role");
    expect(user).toHaveProperty("banned");
    expect(user).toHaveProperty("createdAt");
  });

  it("users have valid roles", () => {
    const validRoles = ["admin", "editor", "viewer"];
    for (const user of useRbacStore.getState().users) {
      expect(validRoles).toContain(user.role);
    }
  });

  it("setUserRole updates the role of the target user", () => {
    useRbacStore.getState().setUserRole("usr_3", "editor");
    const updated = useRbacStore.getState().users.find((u) => u.id === "usr_3");
    expect(updated?.role).toBe("editor");
  });

  it("setUserRole does not affect other users", () => {
    const beforeOther = useRbacStore
      .getState()
      .users.find((u) => u.id === "usr_1");
    useRbacStore.getState().setUserRole("usr_3", "admin");
    const afterOther = useRbacStore
      .getState()
      .users.find((u) => u.id === "usr_1");
    expect(afterOther?.role).toBe(beforeOther?.role);
  });

  it("setUserRole with non-existent id does not modify users", () => {
    const before = useRbacStore.getState().users.map((u) => ({ ...u }));
    useRbacStore.getState().setUserRole("usr_nonexistent", "admin");
    const after = useRbacStore.getState().users;
    expect(after).toEqual(before);
  });

  it("setUserName updates the name of the target user", () => {
    useRbacStore.getState().setUserName("usr_2", "Updated Name");
    const updated = useRbacStore.getState().users.find((u) => u.id === "usr_2");
    expect(updated?.name).toBe("Updated Name");
  });

  it("setUserName does not affect other users", () => {
    const beforeOther = useRbacStore
      .getState()
      .users.find((u) => u.id === "usr_1");
    useRbacStore.getState().setUserName("usr_2", "Changed");
    const afterOther = useRbacStore
      .getState()
      .users.find((u) => u.id === "usr_1");
    expect(afterOther?.name).toBe(beforeOther?.name);
  });

  it("setUserName with non-existent id does not modify users", () => {
    const before = useRbacStore.getState().users.map((u) => ({ ...u }));
    useRbacStore.getState().setUserName("usr_nonexistent", "Ghost");
    const after = useRbacStore.getState().users;
    expect(after).toEqual(before);
  });

  it("multiple setUserRole calls update correctly", () => {
    useRbacStore.getState().setUserRole("usr_3", "editor");
    useRbacStore.getState().setUserRole("usr_3", "admin");
    const user = useRbacStore.getState().users.find((u) => u.id === "usr_3");
    expect(user?.role).toBe("admin");
  });

  it("setUserRole and setUserName can target the same user", () => {
    useRbacStore.getState().setUserRole("usr_2", "admin");
    useRbacStore.getState().setUserName("usr_2", "New Name");
    const user = useRbacStore.getState().users.find((u) => u.id === "usr_2");
    expect(user?.role).toBe("admin");
    expect(user?.name).toBe("New Name");
  });
});
