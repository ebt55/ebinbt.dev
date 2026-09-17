/**
 * Imports a TypeScript module from `src/` into a plain Node script.
 *
 * The OG and postbuild scripts read their copy straight out of the site's
 * own source so the outputs cannot drift from the pages. Node will not
 * import `.ts`, so the file is type-stripped with the TypeScript compiler
 * that is already a devDependency and imported as a data: URL.
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
    .outputText
    // `process.env` reads exist at runtime in Node; keep them working.
    ;
  const url = `data:text/javascript;base64,${Buffer.from(js, 'utf8').toString('base64')}`;
  return import(url);
}
