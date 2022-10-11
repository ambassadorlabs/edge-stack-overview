import * as k8s from '@pulumi/kubernetes'
import * as helm from '@pulumi/kubernetes/helm'
import * as cluster from '../cluster'
import config from '../config'

const namespace = new k8s.core.v1.Namespace('ambassador', {
    metadata: {
      name: 'ambassador',
    },
  }, { provider: cluster.provider })

// The edge-stack chart does not install its own crds so we are installing them ourselves
export const edgeStackCRDs = new k8s.yaml.ConfigFile('edge-stack-3-crds', {
  file: './ambassador/aes-crds.yaml',
}, { provider: cluster.provider })

export const chart = new helm.v3.Chart('ambassador', {
  chart: 'edge-stack',
  version: '8.2.0',
  namespace: namespace.metadata.name,
  fetchOpts: {
    repo: 'https://s3.amazonaws.com/datawire-static-files/charts',
  },
  values: {
    'emissary-ingress': {
      agent: {
        cloudConnectToken: config.requireSecret('cloudConnectToken'),
      },
    }
  }
}, { provider: cluster.provider, dependsOn: edgeStackCRDs })

const ambassadorSvc = chart.getResource('v1/Service', 'ambassador/ambassador')
export const publicIp = ambassadorSvc.status.loadBalancer.ingress[0].ip
