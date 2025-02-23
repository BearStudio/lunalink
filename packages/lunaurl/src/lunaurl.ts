type ExtractParams<Path extends string> =
  Path extends `${string}:${infer Param}/${infer Rest}`
    ? { [K in Param]: string } & ExtractParams<`/${Rest}`>
    : Path extends `${string}:${infer Param}`
      ? { [K in Param]: string }
      : {};

type ParamsDefaultType = Record<string, any>;

type Result =
  | { status: "OK"; data: unknown }
  | { status: "Err"; error: unknown };

export function lunaurl<Path extends string>(
  path: Path,
  params: ExtractParams<Path> & ParamsDefaultType
) {
  return stringSubstitution(path, params);
}

const PARAM_REGEX = /:[_A-Za-z]+\w*/g;
function stringSubstitution(
  pathBeforeReplace: string,
  params: ParamsDefaultType
) {
  const finalPath = pathBeforeReplace.replace(PARAM_REGEX, (pathItem) => {
    const pathItemName = pathItem.slice(1); // Remove the `:`
    // TODO validate name value is provided

    return encodeURIComponent(params[pathItemName]);
  });

  return finalPath;
}
