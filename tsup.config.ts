import { defineConfig, Options } from 'tsup';

const shared: Options = {
  entry: ['src/index.ts'],
  clean: true,
};

export default defineConfig([
  {
    ...shared,
    format: 'esm',
    target: 'node16',
    dts: true,
  },
  {
    ...shared,
    format: 'cjs',
    target: 'node14',
  },
]);
