import { defineConfig, loadEnv } from 'vite';

const DEFAULT_DEV_PORT = 3333;
const DEFAULT_PREVIEW_PORT = 4173;

const parsePort = (value: string | undefined, fallback: number): number => {
  return value ? Number(value) || fallback : fallback;
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    root: 'src',
    envDir: '..',
    publicDir: '../public',
    server: {
      port: parsePort(env['DEV_PORT'], DEFAULT_DEV_PORT),
    },
    preview: {
      port: parsePort(env['PREVIEW_PORT'], DEFAULT_PREVIEW_PORT),
    },
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      rolldownOptions: {
        input: {
          index: 'index.html',
          detail: 'detail.html',
          favorite: 'favorite.html',
        },
      },
    },
  };
});
