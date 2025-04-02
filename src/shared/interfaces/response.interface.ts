export interface Response<T> {
  data: T;
  success: string | null;
  error: string | null;
}
