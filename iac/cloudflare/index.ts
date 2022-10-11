import * as cloudflare from '@pulumi/cloudflare'
import config from '../config'
import * as ambassador from '../ambassador'
import { subdomain } from '../consts'

export const demoDns = new cloudflare.Record('esdemo-thedevelopnik-com', {
  name: subdomain,
  zoneId: config.requireSecret('cloudflareZoneId'),
  type: 'A',
  value: ambassador.publicIp,
  ttl: 1,
  proxied: true,
})

export const chatDns = new cloudflare.Record('chatsvc-thedevelopnik-com', {
  name: 'chatsvc',
  zoneId: config.requireSecret('cloudflareZoneId'),
  type: 'A',
  value: ambassador.publicIp,
  ttl: 1,
  proxied: true,
})

export const userDns = new cloudflare.Record('usersvc-thedevelopnik-com', {
  name: 'usersvc',
  zoneId: config.requireSecret('cloudflareZoneId'),
  type: 'A',
  value: ambassador.publicIp,
  ttl: 1,
  proxied: true,
})
