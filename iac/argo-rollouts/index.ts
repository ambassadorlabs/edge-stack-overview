import * as k8s from '@pulumi/kubernetes'
import * as cluster from '../cluster'
import * as helm from '@pulumi/kubernetes/helm'

const namespace = new k8s.core.v1.Namespace('argo-rollouts', {
  metadata: {
    name: 'argo-rollouts',
  },
}, { provider: cluster.provider })

export const chart = new helm.v3.Chart('argo-rollouts', {
  chart: 'argo-rollouts',
  version: '2.21.1',
  namespace: namespace.metadata.name,
  fetchOpts: {
    repo: 'https://argoproj.github.io/argo-helm',
  },
  values: {
    installCRDs: true
  },
}, { provider: cluster.provider })
