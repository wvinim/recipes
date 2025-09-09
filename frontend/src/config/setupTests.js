import { config } from '@vue/test-utils'
import { vi } from 'vitest'

vi.mock('vue-router', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useRoute: vi.fn(() => ({
      params: { id: '1' },
    })),
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })),
  }
});

config.global.stubs = {
  RouterLink: {
    template: '<a><slot /></a>',
  },
}

vi.mock('../axios-config');

vi.mock('./env', () => ({
  Env: { BACKEND_HOST: '127.0.0.1', BACKEND_PORT: '4000' },
}));