import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

// eslint-config-next 16 exports flat-config arrays directly, so FlatCompat is
// gone. ESLint is held at 9.x because the transitive eslint-plugin-react,
// eslint-plugin-import and eslint-plugin-jsx-a11y still cap their peer at ^9.
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'node_modules/**', '_source/**', 'next-env.d.ts']),
]);
