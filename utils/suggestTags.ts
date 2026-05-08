const tagRules: Array<{ tag: string; keywords: string[] }> = [
  {
    tag: "React",
    keywords: ["react", "component", "コンポーネント", "hooks", "hook"],
  },
  {
    tag: "Next",
    keywords: ["next", "next.js", "app router", "page.tsx", "layout.tsx"],
  },
  {
    tag: "TypeScript",
    keywords: ["typescript", "type", "型", "interface"],
  },
  {
    tag: "Supabase",
    keywords: ["supabase", "rls", "auth", "database", "db"],
  },
  {
    tag: "UI",
    keywords: ["ui", "ux", "style", "css", "デザイン", "見た目"],
  },
  {
    tag: "Bug",
    keywords: ["bug", "fix", "error", "エラー", "修正", "詰まった"],
  },
  {
    tag: "Refactor",
    keywords: ["refactor", "リファクタ", "責務", "分離", "切り出し"],
  },
  {
    tag: "学習",
    keywords: ["学習", "学んだ", "理解", "調査", "読んだ"],
  },
];

export const suggestTags = (text: string): string[] => {
  const normalizedText = text.toLowerCase();

  if (normalizedText.trim() === "") return [];

  return tagRules
    .filter(({ keywords }) =>
      keywords.some((keyword) => normalizedText.includes(keyword)),
    )
    .map(({ tag }) => tag);
};
