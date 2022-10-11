import * as k8s from '@pulumi/kubernetes'

export const provider = new k8s.Provider('daveops-demo', {
    kubeconfig: '/Users/davesudia/.kube/config',
    cluster: 'daveops-demo',
    context: 'daveops-demo'
})
