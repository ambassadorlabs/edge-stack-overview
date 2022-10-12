import * as cloudflare from '@pulumi/cloudflare'
import config from '../config'
import * as ambassador from '../ambassador'
import { websvcSubdomain, apiSubdomain, usersvcSubdomain, chatsvcSubdomain } from '../consts'
import * as ambassadorCRDs from '../crds/ambassador/index'
import * as cluster from '../cluster'

export const wildcardHost = new ambassadorCRDs.getambassador.v3alpha1.Host('wildcard-thedevelopnik', {
  metadata: {
    name: 'wildcard',
    namespace: 'default',
  },
  spec: {
    hostname: '*.thedevelopnik.com',
  },
}, { provider: cluster.provider, dependsOn: ambassador.chart })

export const apiDns = new cloudflare.Record('api-thedevelopnik-com', {
  name: 'api',
  zoneId: config.requireSecret('cloudflareZoneId'),
  type: 'A',
  value: ambassador.publicIp,
  ttl: 1,
  proxied: true,
})

export const apiHost = new ambassadorCRDs.getambassador.v3alpha1.Host(apiSubdomain, {
  metadata: {
    name: apiSubdomain,
    namespace: 'default',
  },
  spec: {
    hostname: `${apiSubdomain}.thedevelopnik.com`,
    acmeProvider: {
      email: config.requireSecret("acmeEmailTwo"),
    }
  }
}, { provider: cluster.provider, dependsOn: [ ambassador.chart, apiDns ] })

export const demoDns = new cloudflare.Record('esdemo-thedevelopnik-com', {
  name: websvcSubdomain,
  zoneId: config.requireSecret('cloudflareZoneId'),
  type: 'A',
  value: ambassador.publicIp,
  ttl: 1,
  proxied: true,
})

export const webHost = new ambassadorCRDs.getambassador.v3alpha1.Host(websvcSubdomain, {
  metadata: {
    name: websvcSubdomain,
    namespace: 'default',
  },
  spec: {
    hostname: `${websvcSubdomain}.thedevelopnik.com`,
    acmeProvider: {
      email: config.requireSecret("acmeEmailOne"),
    }
  }
}, { provider: cluster.provider, dependsOn: [ ambassador.chart, demoDns ] })


export const chatDns = new cloudflare.Record('chatsvc-thedevelopnik-com', {
  name: 'chatsvc',
  zoneId: config.requireSecret('cloudflareZoneId'),
  type: 'A',
  value: ambassador.publicIp,
  ttl: 1,
  proxied: true,
})

export const chatHost = new ambassadorCRDs.getambassador.v3alpha1.Host(chatsvcSubdomain, {
  metadata: {
    name: chatsvcSubdomain,
    namespace: 'default',
  },
  spec: {
    hostname: `${chatsvcSubdomain}.thedevelopnik.com`,
    acmeProvider: {
      email: config.requireSecret("acmeEmailTwo"),
    }
  }
}, { provider: cluster.provider, dependsOn: [ ambassador.chart, chatDns ] })

export const userDns = new cloudflare.Record('usersvc-thedevelopnik-com', {
  name: 'usersvc',
  zoneId: config.requireSecret('cloudflareZoneId'),
  type: 'A',
  value: ambassador.publicIp,
  ttl: 1,
  proxied: true,
})

export const userHost = new ambassadorCRDs.getambassador.v3alpha1.Host(usersvcSubdomain, {
  metadata: {
    name: usersvcSubdomain,
    namespace: 'default',
  },
  spec: {
    hostname: `${usersvcSubdomain}.thedevelopnik.com`,
    acmeProvider: {
      email: config.requireSecret("acmeEmailTwo"),
    }
  }
}, { provider: cluster.provider, dependsOn: [ ambassador.chart, userDns ] })
