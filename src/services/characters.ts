import { http } from "./EndpointService";

export interface Character {
  id: number;
  nickname: string;
  thumbnailUrl: string;
  fullbodyUrl: string;
  style: string;
  ageGroup: string;
  gender: string;
  animations: string[];
  animationDetails: {
    id: number;
    name: string;
    code: string;
    previewUrl: string;
  }[];
}

export interface CharactersResponse {
  success: boolean;
  code: number;
  message: string;
  errors: unknown;
  data: Character[];
}

export async function getCharacters(
  query: { page?: number; size?: number; search?: string },
  headers: Record<string, string>
): Promise<CharactersResponse> {
  const { page, size, search } = query || {};
  const q = {
    // primary keys (as we currently use)
    page,
    size,
    search,
    // common aliases to maximize compatibility
    q: search,
    keyword: search,
    name: search,
    pageNumber: page,
    pageIndex: typeof page === 'number' ? Math.max(0, page - 1) : undefined,
    limit: size,
    per_page: size,
  } as Record<string, unknown>;

  return await http<CharactersResponse>("/asset/characters", {
    method: "GET",
    query: q,
    headers,
  });
}
