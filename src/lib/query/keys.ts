
export const queryKeys = {
  settings: {
    all: ['settings'] as const,
    detail: (id: string) => [...queryKeys.settings.all, id] as const,
    list: () => [...queryKeys.settings.all, 'list'] as const,
  },
  theme: {
    all: ['theme'] as const,
    current: () => [...queryKeys.theme.all, 'current'] as const,
  },
  users: {
    all: ['users'] as const,
    detail: (id: string) => [...queryKeys.users.all, id] as const,
    list: () => [...queryKeys.users.all, 'list'] as const,
  },
  posts: {
    all: ['posts'] as const,
    detail: (id: string) => [...queryKeys.posts.all, id] as const,
    list: () => [...queryKeys.posts.all, 'list'] as const,
  }
} as const;

