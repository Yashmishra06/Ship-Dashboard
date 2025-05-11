export const seedUsers = () => {
  const existing = localStorage.getItem("users");
  if (!existing) {
    const users = [
      { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
      { id: "2", role: "Inspector", email: "inspector@entnt.in", password: "inspect123" },
      { id: "3", role: "Engineer", email: "engineer@entnt.in", password: "engine123" },
    ];
    localStorage.setItem("users", JSON.stringify(users));
  }
};
