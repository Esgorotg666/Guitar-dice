import { stripe } from './stripeBilling';

const MEMORY = new Map();
const MEMORY_MAX = 400;
const META_KEY = 'gd_seen_events';
const META_KEEP = 24;

function remember(id) {
  if (!id) return;
  MEMORY.set(id, Date.now());
  if (MEMORY.size <= MEMORY_MAX) return;
  const first = MEMORY.keys().next().value;
  MEMORY.delete(first);
}

function splitIds(raw) {
  return String(raw || '')
    .split('|')
    .map(function (s) { return s.trim(); })
    .filter(Boolean);
}

export function seenInMemory(eventId) {
  return !!(eventId && MEMORY.has(eventId));
}

export function markMemory(eventId) {
  remember(eventId);
}

export async function alreadyStored(eventId, customerId) {
  if (!eventId) return { duplicate: false };
  if (MEMORY.has(eventId)) return { duplicate: true, via: 'memory' };
  if (!customerId) return { duplicate: false };
  const customer = await stripe('/customers/' + customerId, 'GET');
  const ids = splitIds(customer.metadata && customer.metadata[META_KEY]);
  if (ids.indexOf(eventId) !== -1) return { duplicate: true, via: 'stripe' };
  return { duplicate: false, customer: customer };
}

export async function persistEventId(eventId, customerId, extraMeta) {
  remember(eventId);
  if (!customerId) return;
  const customer = await stripe('/customers/' + customerId, 'GET');
  const ids = splitIds(customer.metadata && customer.metadata[META_KEY]);
  if (ids.indexOf(eventId) === -1) ids.push(eventId);
  const body = {
    ['metadata[' + META_KEY + ']']: ids.slice(-META_KEEP).join('|'),
    'metadata[gd_last_evt]': eventId
  };
  const extra = extraMeta || {};
  Object.keys(extra).forEach(function (k) {
    body['metadata[' + k + ']'] = extra[k];
  });
  await stripe('/customers/' + customerId, 'POST', body);
}

export function customerIdFrom(event) {
  const obj = event && event.data && event.data.object;
  if (!obj) return null;
  if (typeof obj.customer === 'string') return obj.customer;
  if (obj.customer && obj.customer.id) return obj.customer.id;
  return null;
}
