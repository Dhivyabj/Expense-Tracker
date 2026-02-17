export const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });