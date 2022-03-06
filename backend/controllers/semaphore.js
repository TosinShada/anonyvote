const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const path = require("path")

const {
    Semaphore,
    genSignalHash,
    genExternalNullifier,
    generateMerkleProof
} = require("@libsem/protocols")
const { ZkIdentity } = require("@libsem/identity")

const wasmFilePath = path.join("public", "semaphore.wasm")
const finalZkeyPath = path.join("public", "semaphore_final.zkey")

// @desc      Generate Nullifier Hash
// @route     POST /api/v1/semaphore/genNullifierHash
// @access    Public
exports.genNullifierHash = asyncHandler(async (req, res, next) => {
    const { externalNullifier, identityNullifier, treeDepth } = req.body

    const nullifierHash = Semaphore.genNullifierHash(
        externalNullifier,
        identityNullifier,
        treeDepth
    )

    res.status(200).json({
        success: true,
        data: nullifierHash.toString()
    })
})

// @desc      Generate Merkle Proof
// @route     POST /api/v1/semaphore/generateMerkleProof
// @access    Public
exports.generateMerkleProof = asyncHandler(async (req, res, next) => {
    const {
        treeDepth,
        zeroValue,
        identityCommitments,
        identityCommitment,
        serializedIdentity,
        externalNullifier,
        signal
    } = req.body

    const merkleProof = generateMerkleProof(
        treeDepth,
        zeroValue,
        5,
        identityCommitments,
        identityCommitment
    )
    const witness = Semaphore.genWitness(
        serializedIdentity,
        merkleProof,
        externalNullifier,
        signal
    )

    const fullProof = await Semaphore.genProof(
        witness,
        wasmFilePath,
        finalZkeyPath
    )

    const solidityProof = Semaphore.packToSolidityProof(fullProof)
	const root = merkleProof.root.toString()
	const response = { solidityProof, root}

    res.status(200).json({
        success: true,
        data: response
    })
})

// @desc      Generate Proof
// @route     POST /api/v1/semaphore/genProof
// @access    Public
exports.genProof = asyncHandler(async (req, res, next) => {
    const { serializedIdentity, merkleProof, externalNullifier, signal } =
        req.body

    const witness = Semaphore.genWitness(
        serializedIdentity,
        merkleProof,
        externalNullifier,
        signal
    )

    const fullProof = await Semaphore.genProof(
        witness,
        wasmFilePath,
        finalZkeyPath
    )

    const solidityProof = Semaphore.packToSolidityProof(fullProof)

    res.status(200).json({
        success: true,
        data: solidityProof
    })
})

// @desc      Generate External Nullifier
// @route     POST /api/v1/semaphore/genExternalNullifier
// @access    Public
exports.genExternalNullifier = asyncHandler(async (req, res, next) => {
    const { title } = req.body

    const titleHash = genExternalNullifier(title)

    res.status(200).json({
        success: true,
        data: titleHash
    })
})

// @desc      Generate Signal Hash
// @route     POST /api/v1/semaphore/genSignalHash
// @access    Public
exports.genSignalHash = asyncHandler(async (req, res, next) => {
    const { signal } = req.body

    const signalHash = genSignalHash(signal).toString()

    res.status(200).json({
        success: true,
        data: signalHash
    })
})

// @desc      Generate Identity
// @route     GET /api/v1/semaphore/genIdentity
// @access    Public
exports.genIdentity = asyncHandler(async (req, res, next) => {
    const identity = new ZkIdentity()
    const identityCommitment = identity.genIdentityCommitment().toString()

    const identityNullifier = identity.identityNullifier.toString()
    const identityTrapdoor = identity.identityTrapdoor.toString()

    const response = { identityCommitment, identityNullifier, identityTrapdoor }
    res.status(200).json({
        success: true,
        data: response
    })
})
