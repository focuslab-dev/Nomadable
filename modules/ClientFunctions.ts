export const winddowAlert = (msg: string) => {
  if (typeof window !== "undefined") {
    window.alert(msg);
  }
};
