// *** WARNING: this file was generated by crd2pulumi. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import * as utilities from "../../utilities";

import {ObjectMeta} from "../../meta/v1";

export class KubernetesServiceResolver extends pulumi.CustomResource {
    /**
     * Get an existing KubernetesServiceResolver resource's state with the given name, ID, and optional extra
     * properties used to qualify the lookup.
     *
     * @param name The _unique_ name of the resulting resource.
     * @param id The _unique_ provider ID of the resource to lookup.
     * @param opts Optional settings to control the behavior of the CustomResource.
     */
    public static get(name: string, id: pulumi.Input<pulumi.ID>, opts?: pulumi.CustomResourceOptions): KubernetesServiceResolver {
        return new KubernetesServiceResolver(name, undefined as any, { ...opts, id: id });
    }

    /** @internal */
    public static readonly __pulumiType = 'kubernetes:getambassador.io/v1:KubernetesServiceResolver';

    /**
     * Returns true if the given object is an instance of KubernetesServiceResolver.  This is designed to work even
     * when multiple copies of the Pulumi SDK have been loaded into the same process.
     */
    public static isInstance(obj: any): obj is KubernetesServiceResolver {
        if (obj === undefined || obj === null) {
            return false;
        }
        return obj['__pulumiType'] === KubernetesServiceResolver.__pulumiType;
    }

    public readonly apiVersion!: pulumi.Output<"getambassador.io/v1" | undefined>;
    public readonly kind!: pulumi.Output<"TracingService" | undefined>;
    public readonly metadata!: pulumi.Output<ObjectMeta | undefined>;

    /**
     * Create a KubernetesServiceResolver resource with the given unique name, arguments, and options.
     *
     * @param name The _unique_ name of the resource.
     * @param args The arguments to use to populate this resource's properties.
     * @param opts A bag of options that control this resource's behavior.
     */
    constructor(name: string, args?: KubernetesServiceResolverArgs, opts?: pulumi.CustomResourceOptions) {
        let resourceInputs: pulumi.Inputs = {};
        opts = opts || {};
        if (!opts.id) {
            resourceInputs["apiVersion"] = "getambassador.io/v1";
            resourceInputs["kind"] = "TracingService";
            resourceInputs["metadata"] = args ? args.metadata : undefined;
        } else {
            resourceInputs["apiVersion"] = undefined /*out*/;
            resourceInputs["kind"] = undefined /*out*/;
            resourceInputs["metadata"] = undefined /*out*/;
        }
        if (!opts.version) {
            opts = pulumi.mergeOptions(opts, { version: utilities.getVersion()});
        }
        super(KubernetesServiceResolver.__pulumiType, name, resourceInputs, opts);
    }
}

/**
 * The set of arguments for constructing a KubernetesServiceResolver resource.
 */
export interface KubernetesServiceResolverArgs {
    apiVersion?: pulumi.Input<"getambassador.io/v1">;
    kind?: pulumi.Input<"TracingService">;
    metadata?: pulumi.Input<ObjectMeta>;
}
