import { query } from "./_generated/server";

export const getImageUrl = query(async ({ storage }, args: { imageId: string }) => {
  const url = await storage.getUrl(args.imageId);
  return url;
});
