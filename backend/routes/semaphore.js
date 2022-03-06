const express = require("express");
const {
	genNullifierHash,
	generateMerkleProof,
	genProof,
	genExternalNullifier,
	genSignalHash,
	genIdentity
} = require("../controllers/semaphore");

const router = express.Router({ mergeParams: true });

router.route("/genNullifierHash").post(genNullifierHash);

router.route("/generateMerkleProof").post(generateMerkleProof);

router.route("/genProof").post(genProof);

router.route("/genExternalNullifier").post(genExternalNullifier);

router.route("/genSignalHash").post(genSignalHash);

router.route("/genIdentity").get(genIdentity);

module.exports = router;
