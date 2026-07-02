export interface UpdateUserDto {
  name?: string;
}

export interface UserQuery {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
