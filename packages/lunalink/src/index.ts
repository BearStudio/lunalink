import queryString from "query-string";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExplicitAny = any;

/** Accepted types for path parameters */
type ParamValue = string | number | boolean;

/**
 * Type to extract params from a path, its query string and its fragment.
 * The fragment starts at the first `#` (and may contain `?`), the query string
 * starts at the first `?` before it, so neither ends up in a param name.
 */
export type ExtractParams<Path extends string> =
  Path extends `${infer PathAndQuery}#${infer Fragment}`
    ? ExtractPathAndQueryParams<PathAndQuery> & ExtractPathParams<Fragment>
    : ExtractPathAndQueryParams<Path>;

type ExtractPathAndQueryParams<Path extends string> =
  Path extends `${infer Pathname}?${infer Query}`
    ? ExtractPathParams<Pathname> & ExtractPathParams<Query>
    : ExtractPathParams<Path>;

/** Type to extract params from a path without query string nor fragment */
type ExtractPathParams<Path extends string> =
  // 1) Handle path params with `?`
  Path extends `${string}:${infer Param}?`
    ? { [K in Param]: ParamValue }
    : // 2) Handle path splitting
      Path extends `${string}:${infer Param}/${infer Rest}`
      ? { [K in Param]: ParamValue } & ExtractPathParams<`/${Rest}`>
      : // 3) Handle params with dot separator
        Path extends `${string}:${infer Param}.${infer Rest}`
        ? { [K in Param]: ParamValue } & ExtractPathParams<`${Rest}`>
        : // 4) Handle params
          Path extends `${string}:${infer Param}`
          ? { [K in Param]: ParamValue }
          : // Nothing to extract
            // eslint-disable-next-line @typescript-eslint/no-empty-object-type
            {};

/** Type to add more params */
type ParamsDefaultType = Record<string, ExplicitAny>;

type Config = {
  baseURL?: string | URL;
  /**
   * Escape the parameters so the query parameters are safely injected.
   * @default encodeURIComponent
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
   * @param value The value to encode
   * @returns the stringified and escaped value
   */
  encodeURIComponent?: (value: string | number | boolean) => string;
};

export function lunalink<Path extends string>(
  path: Path,
  params: ExtractParams<Path> & ParamsDefaultType,
  config?: Config
) {
  const result = stringSubstitution(path, params, config);

  if (!config?.baseURL) {
    return result;
  }

  return join(config.baseURL.toString(), result, "/");
}

const PARAM_REGEX = /:[_A-Za-z]+\w*/g;
function stringSubstitution(
  pathBeforeReplace: string,
  params: ParamsDefaultType,
  config?: Pick<Config, "encodeURIComponent">
) {
  const paramsMap = new Map(Object.entries(params));
  const used = new Set();
  const encodeFn = config?.encodeURIComponent ?? encodeURIComponent;
  const finalPath = pathBeforeReplace.replace(PARAM_REGEX, (pathItem) => {
    const pathItemName = pathItem.slice(1); // Remove the `:`

    if (!paramsMap.has(pathItemName)) {
      throw new Error(`Missing parameter ${pathItemName}`);
    }

    used.add(pathItemName);
    return encodeFn(params[pathItemName]);
  });

  const leftovers = [...paramsMap].filter(([key]) => !used.has(key));
  const queryParams = queryString.stringify(Object.fromEntries(leftovers));

  return appendQueryParams(finalPath, queryParams);
}

/**
 * Append serialized query params to a path, keeping its existing query string
 * as is and its fragment (`#...`) at the end. An empty query string is removed.
 * @param path The path that may already contain a query string and a fragment
 * @param queryParams The serialized query params to append (can be empty)
 * @returns The path with the merged query string
 */
function appendQueryParams(path: string, queryParams: string) {
  const hashIndex = path.indexOf("#");
  const pathAndQuery = hashIndex === -1 ? path : path.slice(0, hashIndex);
  const fragment = hashIndex === -1 ? "" : path.slice(hashIndex);

  const queryIndex = pathAndQuery.indexOf("?");
  const pathname =
    queryIndex === -1 ? pathAndQuery : pathAndQuery.slice(0, queryIndex);
  const existingQuery =
    queryIndex === -1 ? "" : pathAndQuery.slice(queryIndex + 1);

  const query = [existingQuery, queryParams].filter(Boolean).join("&");

  return `${pathname}${query ? `?${query}` : ""}${fragment}`;
}

/**
 * @param path1 first path to join (can be the start or the end)
 * @param path2 second path to join (can be the start or the end)
 * @param separator The separator to use (default to `/`)
 * @returns The joined paths using the provided separator
 */
export function join(path1: string, path2: string, separator: string = "/") {
  // Ensure path1 is the base URL if either argument is a full URL
  if (/^https?:\/\//.test(path2) && !/^https?:\/\//.test(path1)) {
    [path1, path2] = [path2, path1];
  }

  // Remove trailing separator from path1
  path1 = path1.replace(new RegExp(`${separator}+$`), "");
  // Remove leading separator from path2
  path2 = path2.replace(new RegExp(`^${separator}+`), "");

  return `${path1}${separator}${path2}`;
}
