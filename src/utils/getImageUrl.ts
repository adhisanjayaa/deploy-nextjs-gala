export const getImageUrl = (path: string): string => {
  if (!path) return "";
  // Pastikan base URL tidak diakhiri dengan slash
  const baseUrl =
    process.env.NEXT_PUBLIC_POCKETBASE_URL?.replace(/\/$/, "") || "";
  // Pastikan path selalu diawali dengan slash
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
};
