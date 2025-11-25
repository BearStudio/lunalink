import queryString from "query-string";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExplicitAny = any;

/** Type to extract params from a path */
export type ExtractParams<Path extends string> =
  // 1) Handle path params with `?`
  Path extends `${string}:${infer Param}?`
    ? { [K in Param]: string }
    : // 2) Handle path splitting
      Path extends `${string}:${infer Param}/${infer Rest}`
      ? { [K in Param]: string } & ExtractParams<`/${Rest}`>
      : // 3) Handle params with dot separator
        Path extends `${string}:${infer Param}.${infer Rest}`
        ? { [K in Param]: string } & ExtractParams<`${Rest}`>
        : // 4) Handle params
          Path extends `${string}:${infer Param}`
          ? { [K in Param]: string }
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
  // If no more params are available we return the string
  if (leftovers.length === 0) {
    return finalPath;
  }

  const queryParams = queryString.stringify(Object.fromEntries(leftovers));
  return `${cleanPath(finalPath)}?${queryParams}`;
}

/**
 *
 * @param path The path to clean
 * @returns The cleaned path
 */
function cleanPath(path: string) {
  if (path.endsWith("?")) {
    return path.slice(0, -1);
  }

  return path;
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
