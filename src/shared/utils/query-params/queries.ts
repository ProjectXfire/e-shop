export const viewMode = ["grid", "list"] as const;
export const order = ["asc", "desc"] as const;
export const sizes = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export type ViewMode = (typeof viewMode)[number];
export type Order = (typeof order)[number];
export type Size = (typeof sizes)[number];
