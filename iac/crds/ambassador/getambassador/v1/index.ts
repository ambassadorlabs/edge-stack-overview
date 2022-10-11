// *** WARNING: this file was generated by crd2pulumi. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import * as utilities from "../../utilities";

// Export members:
export * from "./authService";
export * from "./consulResolver";
export * from "./devPortal";
export * from "./kubernetesEndpointResolver";
export * from "./kubernetesServiceResolver";
export * from "./logService";
export * from "./mapping";
export * from "./module";
export * from "./rateLimitService";
export * from "./tcpmapping";
export * from "./tlscontext";
export * from "./tracingService";

// Import resources to register:
import { AuthService } from "./authService";
import { ConsulResolver } from "./consulResolver";
import { DevPortal } from "./devPortal";
import { KubernetesEndpointResolver } from "./kubernetesEndpointResolver";
import { KubernetesServiceResolver } from "./kubernetesServiceResolver";
import { LogService } from "./logService";
import { Mapping } from "./mapping";
import { Module } from "./module";
import { RateLimitService } from "./rateLimitService";
import { TCPMapping } from "./tcpmapping";
import { TLSContext } from "./tlscontext";
import { TracingService } from "./tracingService";

const _module = {
    version: utilities.getVersion(),
    construct: (name: string, type: string, urn: string): pulumi.Resource => {
        switch (type) {
            case "kubernetes:getambassador.io/v1:AuthService":
                return new AuthService(name, <any>undefined, { urn })
            case "kubernetes:getambassador.io/v1:ConsulResolver":
                return new ConsulResolver(name, <any>undefined, { urn })
            case "kubernetes:getambassador.io/v1:DevPortal":
                return new DevPortal(name, <any>undefined, { urn })
            case "kubernetes:getambassador.io/v1:KubernetesEndpointResolver":
                return new KubernetesEndpointResolver(name, <any>undefined, { urn })
            case "kubernetes:getambassador.io/v1:KubernetesServiceResolver":
                return new KubernetesServiceResolver(name, <any>undefined, { urn })
            case "kubernetes:getambassador.io/v1:LogService":
                return new LogService(name, <any>undefined, { urn })
            case "kubernetes:getambassador.io/v1:Mapping":
                return new Mapping(name, <any>undefined, { urn })
            case "kubernetes:getambassador.io/v1:Module":
                return new Module(name, <any>undefined, { urn })
            case "kubernetes:getambassador.io/v1:RateLimitService":
                return new RateLimitService(name, <any>undefined, { urn })
            case "kubernetes:getambassador.io/v1:TCPMapping":
                return new TCPMapping(name, <any>undefined, { urn })
            case "kubernetes:getambassador.io/v1:TLSContext":
                return new TLSContext(name, <any>undefined, { urn })
            case "kubernetes:getambassador.io/v1:TracingService":
                return new TracingService(name, <any>undefined, { urn })
            default:
                throw new Error(`unknown resource type ${type}`);
        }
    },
};
pulumi.runtime.registerResourceModule("crds", "getambassador.io/v1", _module)
