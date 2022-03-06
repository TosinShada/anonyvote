/* eslint-disable radix */
import React, { useState, useEffect, Fragment } from "react"
// material
import { Button } from "reactstrap"
import { storeWallet } from "@utils/storage"
import { connectContract } from "../../../../services/logic"

// ----------------------------------------------------------------------

const { ethereum } = window

export default function WalletConnect() {
    const [currentAccount, setCurrentAccount] = useState(null)

    const checkWalletIsConnected = async () => {
        if (!ethereum) {
            alert("Make sure you have Metamask installed!")
        }

        const accounts = await ethereum.request({ method: "eth_accounts" })
        // const chainId = await ethereum.request({ method: 'eth_chainId' })

        // if (chainId !== 1337) {
        //   await ethereum.request({
        //     method: 'wallet_switchEthereumChain',
        //     params: [{ chainId: '0x1' }]
        //   })
        // }

        if (accounts.length !== 0) {
            const account = accounts[0]
            setCurrentAccount(account)
            storeWallet(account)
        }
    }

    const connectWalletHandler = async () => {
        if (!ethereum) {
            alert("Please install Metamask!")
        }

        try {
            const accounts = await ethereum.request({
                method: "eth_requestAccounts"
            })
            setCurrentAccount(accounts[0])
            connectContract()
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        checkWalletIsConnected()
    }, [currentAccount])

    return (
        <Fragment>
            {currentAccount ? (
                <Button.Ripple color='primary' outline>
                    Wallet Connected
                </Button.Ripple>
            ) : (
                <Button.Ripple
                    color='primary'
                    outline
                    onClick={connectWalletHandler}
                >
                    Connect Wallet
                </Button.Ripple>
            )}
        </Fragment>
    )
}
