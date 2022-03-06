import { Fragment, useState, useEffect } from "react"

import {
    Card,
    CardImg,
    CardBody,
    Row,
    Col,
    CardTitle,
    CardText,
    Modal,
    Input,
    Label,
    Button,
    ModalBody,
    ModalHeader,
    FormFeedback
} from "reactstrap"
import Poll from "react-polls"

// ** Custom Components
import Breadcrumbs from "../utility/breadcrumbs"

import { generateMerkleProof, genNullifierHash, getPolls } from "../services/apiCalls"

import img1 from "@src/assets/images/slider/06.jpg"
import CreatePoll from "./CreatePoll"
import {
    getIdentityCommitments,
    connectContract,
    packProof,
    broadcastSignal,
    voteOption
} from "../services/logic"
import { handleError, handleLoading, handleSuccess } from "../utility/alert"
import { retrieveId } from "../utility/storage"

const Home = () => {
    // ** States
    const [data, setData] = useState([])
    const [show, setShow] = useState(false)

    const ZERO_VALUE = "56568702409114342732388388764660722017601642515166106701650971766248247995328"

    useEffect(() => {
        getPolls().then((polls) => {
            setData(polls.data.data)
        })
    }, [])

    connectContract()

    // Handling user vote
    const handleVote = async (voteAnswer, options, pollHash, pollId) => {
        const pollAnswer = options.find(
            (answer) => answer.option === voteAnswer
        )
        const newVotes = pollAnswer.votes + 1
        handleLoading()
        const signal = pollAnswer.signal
        const externalNullifier = pollHash
        const identityCommitments = await getIdentityCommitments()
        const identity = retrieveId()
        const treeDepth = 20
        const identityCommitment = identity.identityCommitment

        const genNullifierHashReq = {}
        genNullifierHashReq.externalNullifier = externalNullifier
        genNullifierHashReq.identityNullifier = identity.identityNullifier
        genNullifierHashReq.treeDepth = treeDepth

        const genNullifierHashResponse = await genNullifierHash(genNullifierHashReq)

        const nullifierHash = genNullifierHashResponse.data.data

        const serializedIdentity = {
            identityNullifier: identity.identityNullifier,
            identityTrapdoor: identity.identityTrapdoor
        }

        const genProofReq = {}
        genProofReq.treeDepth = treeDepth
        genProofReq.zeroValue = ZERO_VALUE
        genProofReq.identityCommitments = identityCommitments
        genProofReq.identityCommitment = identityCommitment
        genProofReq.serializedIdentity = serializedIdentity
        genProofReq.externalNullifier = externalNullifier
        genProofReq.signal = signal

        console.log(genProofReq)
        const genProofResponse = await generateMerkleProof(genProofReq)
        const solidityProof = genProofResponse.data.data.solidityProof
        const root = genProofResponse.data.data.root

        const packedProof = await packProof(solidityProof)

        const intProofs = []
        let intProof
        packedProof.map((proof) => {
            intProof = BigInt(proof)
            intProofs.push(intProof)
            return intProofs
        })

        const isValidBroadcast = await broadcastSignal(
            signal,
            intProofs,
            root,
            nullifierHash,
            externalNullifier
        )

        if (isValidBroadcast) {
            await voteOption(options, voteAnswer, pollId, newVotes)
            handleSuccess()
        } else {
            handleError()
        }
    }

    const renderPolls = () => {
        if (data.length) {
            return data.map((poll) => {
                return (
                    <Col key={poll._id}>
                        <Card className='mb-3'>
                            <CardImg top src={img1} alt='card-top' />
                            <CardBody>
                                <CardTitle tag='h4'>{poll.title}</CardTitle>
                                <CardText>{poll.description}</CardText>
                                <CardText>
                                    <small className='text-muted'>
                                        {`Expires: ${poll.expiry}`}
                                    </small>
                                </CardText>
                                <Poll
                                    question={poll._id}
                                    answers={poll.options}
                                    onVote={(voteAnswer) => handleVote(
                                            voteAnswer,
                                            poll.options,
                                            poll.hash,
                                            poll._id
                                        )
                                    }
                                    customStyles={{ theme: "blue" }}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                )
            })
        }
    }

    return (
        <Fragment>
            <Breadcrumbs
                breadCrumbTitle='Anonymous Polls'
                breadCrumbParent='Vote'
                setShow={setShow}
            />

            <Row md='3' sm='2' xs='1'>
                {" "}
                {renderPolls()}
            </Row>
            <Modal
                isOpen={show}
                toggle={() => setShow(!show)}
                className='modal-dialog-centered modal-lg'
            >
                <ModalHeader
                    className='bg-transparent'
                    toggle={() => setShow(!show)}
                ></ModalHeader>
                <ModalBody className='px-sm-5 mx-50 pb-5'>
                    <div className='text-center mb-2'>
                        <h1 className='mb-1'>Add a New Poll</h1>
                    </div>
                    <CreatePoll setShow={setShow} />
                </ModalBody>
            </Modal>
        </Fragment>
    )
}

export default Home
