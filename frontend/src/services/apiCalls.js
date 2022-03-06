import { getRequest, putRequest, postRequest } from './axiosClient'

export function getPolls() {
  return getRequest('/api/v1/polls')
}

export function vote(id, payload) {
  return putRequest(`/api/v1/polls/${id}`, payload)
}

export function createPoll(payload) {
  return postRequest('/api/v1/polls', payload)
}

export function genNullifierHash(payload) {
  return postRequest('/api/v1/semaphore/genNullifierHash', payload)
}

export function generateMerkleProof(payload) {
  return postRequest('/api/v1/semaphore/generateMerkleProof', payload)
}

export function genProof(payload) {
  return postRequest('/api/v1/semaphore/genProof', payload)
}

export function genExternalNullifier(payload) {
  return postRequest('/api/v1/semaphore/genExternalNullifier', payload)
}

export function genSignalHash(payload) {
  return postRequest('/api/v1/semaphore/genSignalHash', payload)
}

export function genIdentity(payload) {
  return getRequest('/api/v1/semaphore/genIdentity', payload)
}