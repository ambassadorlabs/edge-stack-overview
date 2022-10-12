import * as cluster from './cluster'
import * as ambassador from './ambassador'
import * as cloudflare from './cloudflare'
import * as rollouts from './argo-rollouts'
import * as argocd from './argocd'

cluster.provider
ambassador.chart
ambassador.k8sEndpointResolver
cloudflare.wildcardHost
cloudflare.apiDns
cloudflare.apiHost
cloudflare.demoDns
cloudflare.webHost
cloudflare.chatDns
cloudflare.chatHost
cloudflare.userDns
cloudflare.userHost
rollouts.chart
argocd.namespace
argocd.chart
argocd.host
