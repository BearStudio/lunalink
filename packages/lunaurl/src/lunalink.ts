import queryString from "query-string";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExplicitAny = any;

/** Type to extract params from a path */
type ExtractParams<Path extends string> =
  // Handle path handing with `?`
  Path extends `${string}:${infer Param}?`
    ? { [K in Param]: string }
    : // Handle path splitting
      Path extends `${string}:${infer Param}/${infer Rest}`
      ? { [K in Param]: string } & ExtractParams<`/${Rest}`>
      : // Handle params
        Path extends `${string}:${infer Param}`
        ? { [K in Param]: string }
        : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
          {};

/** Type to add more params */
type ParamsDefaultType = Record<string, ExplicitAny>;

export function lunalink<Path extends string>(
  path: Path,
  params: ExtractParams<Path> & ParamsDefaultType,
  config?: { baseURL?: string | URL }
) {
  const result = stringSubstitution(path, params);

  if (!config?.baseURL) {
    return result;
  }

  return join(config.baseURL.toString(), result, "/");
}

const PARAM_REGEX = /:[_A-Za-z]+\w*/g;
function stringSubstitution(
  pathBeforeReplace: string,
  params: ParamsDefaultType
) {
  const leftovers = new Map(Object.entries(params));
  const finalPath = pathBeforeReplace.replace(PARAM_REGEX, (pathItem) => {
    const pathItemName = pathItem.slice(1); // Remove the `:`

    if (!leftovers.has(pathItemName)) {
      throw new Error(`Missing parameter ${pathItemName}`);
    }

    leftovers.delete(pathItemName);
    return encodeURIComponent(params[pathItemName]);
  });

  // If no more params are available we return the string
  if (leftovers.size === 0) {
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
 * @param separator The separaotor to use (default to `/`)
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
