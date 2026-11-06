import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      "next-env.d.ts",
      // Plesk custom-start infrastructure (intentionally uses require())
      "start.js",
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    // Pre-existing code patterns (any usage, legacy set-state effects) surface
    // under the stricter next@16 typescript preset. Kept off to preserve the
    // previous lint behavior; address as a separate cleanup, not this migration.
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-wrapper-object-types": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/static-components": "off",
    },
  },
];

export default eslintConfig;
