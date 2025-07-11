import type { HostConfig } from "react-reconciler";
import type { NodeType } from "../dom/types";
import type { Container } from "./Container";
import type { Node } from "./Node";
export declare const debug: (message?: any, ...optionalParams: any[]) => void;
type Instance = Node<unknown>;
type Props = object;
type TextInstance = Node<unknown>;
type SuspenseInstance = Instance;
type HydratableInstance = Instance;
type PublicInstance = Instance;
type HostContext = null;
type UpdatePayload = Container;
type ChildSet = unknown;
type TimeoutHandle = NodeJS.Timeout;
type NoTimeout = -1;
type SkiaHostConfig = HostConfig<NodeType, Props, Container, Instance, TextInstance, SuspenseInstance, HydratableInstance, PublicInstance, HostContext, UpdatePayload, ChildSet, TimeoutHandle, NoTimeout>;
export declare const sksgHostConfig: SkiaHostConfig;
export {};
