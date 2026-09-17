/**
 * Imports a TypeScript module from `src/` into a plain Node script.
 *
 * The OG and banner scripts read their copy and their chart straight out of the
 * site's own source so the images cannot drift from the page. Node will not
 * import `.ts`, so the file is type-stripped with the TypeScript compiler that
 * is already a devDependency and imported as a data: URL.
 */
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

/** @param {string} file Absolute path to a .ts module under src/. */
export async function loadTs(file) {
  const source = await readFile(file, 'utf8');
  const js = ts
    .transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    })
    .outputText // `import.meta.env` only exists inside Vite; the token is irrelevant here.
    .replace(/import\.meta\.env/g, '({})');
  const url = `data:text/javascript;base64,${Buffer.from(js, 'utf8').toString('base64')}`;
  return import(url);
}
