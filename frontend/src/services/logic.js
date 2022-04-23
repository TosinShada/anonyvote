import { providers, Contract, ethers } from "ethers"
import config from "../artifacts/config.json"
import semaphoreArtifact from "../artifacts/contracts/Semaphore.json"
import { storeId } from "../utility/storage"
import { vote, createPoll } from "./apiCalls"
import { ZkIdentity } from "@libsem/identity"
import {
    genSignalHash,
    genExternalNullifier,
    Semaphore,
    generateMerkleProof
} from "@libsem/protocols"

let semaphoreContract

const { localStorage } = window

async function genIdentity() {
    const identity = new ZkIdentity()
    const identityCommitment = identity.genIdentityCommitment().toString()

    const identityNullifier = identity.identityNullifier.toString()
    const identityTrapdoor = identity.identityTrapdoor.toString()

    const response = { identityCommitment, identityNullifier, identityTrapdoor }
    return response
}

export async function genNullifierHash() {
    const nullifierHash = Semaphore.genNullifierHash(
        externalNullifier,
        identityNullifier,
        treeDepth
    )
    return nullifierHash
}

export async function genMerkleProof(request) {
    const {
        treeDepth,
        zeroValue,
        identityCommitments,
        identityCommitment,
        serializedIdentity,
        externalNullifier,
        signal
    } = request

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
    const response = { solidityProof, root }
    return response
}

export async function connectContract() {
    const { ethereum } = window
    const accounts = await ethereum.request({ method: "eth_accounts" })

    if (accounts.length !== 0) {
        const provider = new providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        console.log("signer: ", await signer.getAddress())

        semaphoreContract = new Contract(
            config.chain.contracts.Semaphore,
            semaphoreArtifact.abi,
            signer
        )
    }
}

export async function registerIdentity() {
    const identity = await genIdentity()
    console.log(identity)
    const identityCommitment = identity.identityCommitment

    console.log("Identity Commitment: ", identityCommitment)
    const tx = await semaphoreContract.insertIdentity(identityCommitment)
    const receipt = await tx.wait()
    console.log(receipt)
    if (receipt.status === 1) {
        storeId(identity, identityCommitment)
        return true
    }
    return false
}

export async function getIdentityCommitments() {
    const idCommitments = await semaphoreContract
        .getIdentityCommitments()
        .catch((error) => {
            console.log(error)
        })
    const identityCommitments = []
    // eslint-disable-next-line prefer-const
    for (let idc of idCommitments) {
        identityCommitments.push(idc.toString())
    }
    return identityCommitments
}

export async function packProof(solidityProof) {
    const packedProof = await semaphoreContract
        .packProof(solidityProof.a, solidityProof.b, solidityProof.c)
        .catch((err) => console.log(err))
    return packedProof
}

export async function broadcastSignal(
    signal,
    packedProof,
    root,
    nullifierHash,
    externalNullifier
) {
    try {
        const tx = await semaphoreContract
            .broadcastSignal(
                ethers.utils.hexlify(ethers.utils.toUtf8Bytes(signal)),
                packedProof,
                root,
                nullifierHash,
                externalNullifier
            )
            .catch(() => {
                return false
            })
        const receipt = await tx.wait()
        console.log(receipt)
        if (receipt.status === 1) {
            return true
        }
        return false
    } catch {
        return false
    }
}

export async function addPoll(poll) {
    try {
        const title = poll.title.replace(/\s+/g, "")
        const titleHash = genExternalNullifier(title)

        const tx = await semaphoreContract
            .addExternalNullifier(titleHash)
            .catch((err) => console.log(err))
        const receipt = await tx.wait()

        console.log(receipt)

        if (receipt.status === 1) {
            const request = poll
            request.hash = titleHash
            request.owner = localStorage.getItem("wallet_address")

            for (let index = 0; index < 3; index++) {
                const signal = `0x0${index}`
                request.options[index].signal = signal

                const signalHash = genSignalHash(signal)

                request.options[index].hash = signalHash
            }
            console.log(request)
            createPoll(request)
            return true
        }
    } catch {
        return false
    }
}

export async function voteOption(options, voteAnswer, pollId, newVotes) {
    const pollAnswer = options.map((answer) => {
        if (answer.option === voteAnswer) {
            answer.votes = newVotes
        }
        return answer
    })

    const request = { options: pollAnswer }

    vote(pollId, request).then((poll) => {
        console.log(poll)
    })
}
