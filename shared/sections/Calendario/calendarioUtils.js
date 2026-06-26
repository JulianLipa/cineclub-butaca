export const eventIcon = (type) => (type === "ciclo" ? "rectangle" : "funcion");

export const maskStyle = (icon, color = "var(--primary)") => ({
  WebkitMaskImage: `url(/icons/${icon})`,
  WebkitMaskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskImage: `url(/icons/${icon})`,
  maskSize: "contain",
  maskRepeat: "no-repeat",
  maskPosition: "center",
  backgroundColor: color,
});
