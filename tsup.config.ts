import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm'],
    dts: true,
    clean: true,
    sourcemap: true,
    splitting: false,
    treeshake: true,
    minify: false,
    target: 'node18',
    outDir: 'dist',
    external: ['zod'],
    noExternal: [],
    esbuildOptions(options) {
        options.banner = {
            js: '// NEPSE Unofficial API - https://github.com/surajrimal07/nepse-api-unofficial',
        };
    },
});
