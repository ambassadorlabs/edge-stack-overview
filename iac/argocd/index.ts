import * as k8s from '@pulumi/kubernetes'
import * as cloudflare from '@pulumi/cloudflare'
import * as cluster from '../cluster'
import * as ambassadorCRDs from '../crds/ambassador/index'
import * as ambassador from '../ambassador'
import * as argocd from '../crds/argocd/index'
import config from '../config'
import * as helm from '@pulumi/kubernetes/helm'
import { Output } from '@pulumi/pulumi'

export const namespace = new k8s.core.v1.Namespace('argocd', {
  metadata: {
    name: 'argocd',
  },
}, { provider: cluster.provider })

// The argocd chart cannot upgrade its own crds
// instructions for upgrading crds are here: https://github.com/argoproj/argo-helm/tree/main/charts/argo-cd#upgrading
export const chart = new helm.v3.Chart('argo-cd', {
  chart: 'argo-cd',
  version: '5.5.21',
  namespace: namespace.metadata.name,
  fetchOpts: {
    repo: 'https://argoproj.github.io/argo-helm',
  },
  values: {
    server: {
      extraArgs: ['--insecure'],
    },
    configs: {
      rbacConfig: {
        secret: {
          argoServerAdminPassword: config.requireSecret('argoServerAdminPassword')
        }
      }
    },
  },
}, { provider: cluster.provider })

export const argoConsoleMapping = new ambassadorCRDs.getambassador.v3alpha1.Mapping('argo-console', {
  metadata: {
    name: 'argocd-server',
    namespace: namespace.metadata.name,
    labels: {
      host: 'argocd.thedevelopnik.com'
    }
  },
  spec: {
    hostname: 'argocd.thedevelopnik.com',
    prefix: '/',
    service: 'http://argo-cd-argocd-server.argocd',
    timeout_ms: 10000
  },
}, { provider: cluster.provider, dependsOn: ambassador.chart })

export const argoCliMapping = new ambassadorCRDs.getambassador.v3alpha1.Mapping('argo-cli', {
  metadata: {
    name: 'argocd-server-cli',
    namespace: namespace.metadata.name,
    labels: {
      host: 'argocd.thedevelopnik.com'
    }
  },
  spec: {
    hostname: 'argocd.thedevelopnik.com:443',
    prefix: '/',
    service: 'http://argo-cd-argocd-server.argocd',
  },
}, { provider: cluster.provider, dependsOn: ambassador.chart })

const argoDNS = new cloudflare.Record('argocd', {
  name: 'argocd',
  zoneId: config.requireSecret('cloudflareZoneId'),
  type: 'A',
  value: ambassador.publicIp,
  ttl: 1,
  proxied: true,
})

export const host = new ambassadorCRDs.getambassador.v3alpha1.Host('argocd-host', {
  metadata: {
    name: 'argocd',
    namespace: namespace.metadata.name,
  },
  spec: {
    hostname: 'argocd.thedevelopnik.com',
    acmeProvider: {
      email: config.requireSecret("acmeEmailTwo"),
    }
  }
}, { provider: cluster.provider, dependsOn: argoDNS })

export const appProject = new argocd.argoproj.v1alpha1.AppProject('es-demo', {
  metadata: {
    name: 'es-demo',
    namespace: namespace.metadata.name
  },
  spec: {
    description: 'ES demo app environments',
    sourceRepos: [ 'https://github.com/ambassadorlabs/edge-stack-overview' ],
    destinations: [
      {
        namespace: 'default',
        server: 'https://kubernetes.default.svc',
      },
    ]
  }
}, { provider: cluster.provider })

const websvcApp = new argocd.argoproj.v1alpha1.Application(`websvc`, {
  metadata: {
    namespace: namespace.metadata.name,
    name: `websvc`,
  },
  spec: {
    destination: {
      namespace: 'default',
      server: 'https://kubernetes.default.svc'
    },
    syncPolicy: {
      automated: {
        prune: true,
        selfHeal: true
      }
    },
    project: appProject.metadata.name as Output<string>,
    source: {
      path: 'deploy/websvc',
      repoURL: 'https://github.com/ambassadorlabs/edge-stack-overview',
      targetRevision: 'HEAD',
    }
  }
}, { provider: cluster.provider })

const chatsvcApp = new argocd.argoproj.v1alpha1.Application(`chatsvc`, {
  metadata: {
    namespace: namespace.metadata.name,
    name: `chatsvc`,
  },
  spec: {
    destination: {
      namespace: 'default',
      server: 'https://kubernetes.default.svc'
    },
    syncPolicy: {
      automated: {
        prune: true,
        selfHeal: true
      }
    },
    project: appProject.metadata.name as Output<string>,
    source: {
      path: 'deploy/chatsvc',
      repoURL: 'https://github.com/ambassadorlabs/edge-stack-overview',
      targetRevision: 'HEAD',
    }
  }
}, { provider: cluster.provider })

const usersvcApp = new argocd.argoproj.v1alpha1.Application(`usersvc`, {
  metadata: {
    namespace: namespace.metadata.name,
    name: `usersvc`,
  },
  spec: {
    destination: {
      namespace: 'default',
      server: 'https://kubernetes.default.svc'
    },
    syncPolicy: {
      automated: {
        prune: true,
        selfHeal: true
      }
    },
    project: appProject.metadata.name as Output<string>,
    source: {
      path: 'deploy/usersvc',
      repoURL: 'https://github.com/ambassadorlabs/edge-stack-overview',
      targetRevision: 'HEAD',
    }
  }
}, { provider: cluster.provider })
