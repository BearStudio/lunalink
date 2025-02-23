import queryString from "query-string";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExplicitAny = any;

type ExtractParams<Path extends string> =
  Path extends `${string}:${infer Param}?/${infer Rest}`
    ? { [K in Param]: string } & ExtractParams<`/${Rest}`>
    : Path extends `${string}:${infer Param}?`
      ? { [K in Param]: string }
      : Path extends `${string}:${infer Param}/${infer Rest}`
        ? { [K in Param]: string } & ExtractParams<`/${Rest}`>
        : Path extends `${string}:${infer Param}`
          ? { [K in Param]: string }
          : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
            {};

type ParamsDefaultType = Record<string, ExplicitAny>;

export function lunaurl<Path extends string>(
  path: Path,
  params: ExtractParams<Path> & ParamsDefaultType
) {
  const result = stringSubstitution(path, params);

  return result;
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
