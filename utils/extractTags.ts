export const extractTags = (text: string) => {
  const matches = text.match(/#\S+/g) || [];

  return matches.map((tag) => tag.replace("#", ""));
};
