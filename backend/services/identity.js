const { genIdentity, genIdentityCommitment, genExternalNullifier } = require('libsemaphore');

const identity = genIdentity();

exports.identityCommitment = genIdentityCommitment(identity);

exports.hash = genExternalNullifier(externalNullifier)
