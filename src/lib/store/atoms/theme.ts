import { atomWithStorage } from 'jotai/utils';
import type { Settings } from "@/components/admin/settings/types";

export const themeAtom = atomWithStorage<Settings | null>('theme', null);