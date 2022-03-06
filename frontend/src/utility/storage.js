const { localStorage } = window

// The storage key depends on the mixer contracts to prevent conflicts
const postfix = 'identity_commitment'
const key = `SU_${postfix}`

const initStorage = () => {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, '')
  }
}

const storeId = (identity, identityCommitment) => {
  localStorage.setItem(key, identityCommitment)
  localStorage.setItem('SU_identity_nullifier', identity.identityNullifier)
  localStorage.setItem('SU_identity_trapdoor', identity.identityTrapdoor)
}

const retrieveId = () => {
  const identityCommitment = localStorage.getItem(key)
  const identityNullifier = localStorage.getItem('SU_identity_nullifier')
  const identityTrapdoor = localStorage.getItem('SU_identity_trapdoor')
  return { identityCommitment, identityNullifier, identityTrapdoor }
}

const hasId = () => {
  const d = localStorage.getItem(key)
  return d !== null && d.length > 0
}

const storeWallet = (wallet) => {
  localStorage.setItem('wallet_address', wallet)
}

export { initStorage, storeId, retrieveId, hasId, storeWallet }
