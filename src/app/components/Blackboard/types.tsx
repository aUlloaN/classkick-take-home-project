import { ERASER_TOOL_ALIAS, PENCIL_TOOL_ALIAS } from "./constants";

export type Tool = typeof PENCIL_TOOL_ALIAS | typeof ERASER_TOOL_ALIAS;