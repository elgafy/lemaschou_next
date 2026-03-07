import next from "@next/eslint-plugin-next";

export default [
  {
    plugins: { next },
    rules: next.configs.recommended.rules,
  },
];