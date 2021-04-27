export class ResponseV1Models<T> {
  constructor(
    public count: number,
    public next: string,
    public previous: string,
    public results: Array<T>
  ) {}
}
