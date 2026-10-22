import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    // This app hydrates client-only localStorage state (session, profile,
    // orders) after mount via useEffect to avoid SSR hydration mismatches.
    // Synchronous setState inside the effect body is intentional there;
    // useSyncExternalStore would add complexity without benefit here.
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "node_modules/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
