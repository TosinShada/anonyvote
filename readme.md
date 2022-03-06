# AnonyVote

## Description
This project will focus on building a decentralized voting portal that will allow voters to anonymously verify they belong to a set of registered voters and cast vote by signaling their endorsement of a particular string.
This portal will allow anyone to create a poll and automatically become the coordinator of said poll. Users can then register to vote on the poll and vote for their choice. We will be using Zero Knowledge proofs to handle the registration and voting by the users. Each poll will have a unique external nullifier and the user will only be able to vote once per each external nullifier.

## How It Works
The application will be subdivided into three projects namely the backend which is built with Express.js, the frontend built with React and the Contracts to be deployed on Harmony blockchain. The three interfaces will come together to provide the users with a complete platform where they can anonymously vote a poll and the records will be stored on the blockchain.
No personally identifiable data is stored on the backend servers or the blockchain and each user is identified with their identity commitment that is either stored on the browser or by the user.

## Future Roadmap
There is a great deal of activities to be done to meet the needs of the users and some of them outlined for the short and long term are:
- Ability to register DAOs as an entity on the portal and restrict their polls to only their members
- Implement Anti Collusion mechanisms to prevent collusion between the voters and the candidates
- Release a governance token to manage the portal effectively
- Use PLONK setup for the trusted setup
- Create more interfaces to reach the blockchain and backend servers

## Install Dependencies

```
npm install
```

## Run App

```
# Run in dev mode
npm run start

# Run in prod mode
npm run build
```

## Demo
The application is live at [AnonyVote](https://anonyvote-frontend.vercel.app/home)