// ** React Imports
import { useState } from "react"
import { Link } from "react-router-dom"

// ** Third Party Components
import Proptypes from "prop-types"

// ** Reactstrap Imports
import { Breadcrumb, BreadcrumbItem, Button } from "reactstrap"

import { hasId } from "./storage"
import { registerIdentity } from "../services/logic"

const Breadcrumbs = (props) => {
    // ** Props
    const { breadCrumbTitle, breadCrumbParent, setShow } = props

    const [isRegistered, setIsRegistered] = useState(hasId())

    const handleRegisterButton = async () => {
        const res = await registerIdentity()
        if (res) {
            setIsRegistered(true)
        }
    }

    return (
        <div className='content-header row'>
            <div className='content-header-left col-md-7 col-12 mb-2'>
                <div className='row breadcrumbs-top'>
                    <div className='col-12'>
                        {breadCrumbTitle ? (
                            <h2 className='content-header-title float-start mb-0'>
                                {breadCrumbTitle}
                            </h2>
                        ) : (
                            ""
                        )}
                        <div className='breadcrumb-wrapper vs-breadcrumbs d-sm-block d-none col-12'>
                            <Breadcrumb>
                                <BreadcrumbItem tag='li'>
                                    <Link to='/'>Home</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem
                                    tag='li'
                                    className='text-primary'
                                >
                                    {breadCrumbParent}
                                </BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                    </div>
                </div>
            </div>
            <div className='content-header-right text-md-end col-md-5 col-12 d-md-inline d-none'>
                {!isRegistered && (
                    <Button.Ripple
                        color='primary'
                        outline
                        className='me-2'
                        onClick={handleRegisterButton}
                    >
                        Add Identity
                    </Button.Ripple>
                )}
                <Button.Ripple color='primary' outline onClick={() => setShow(true)}>
                    Add Poll
                </Button.Ripple>
            </div>
        </div>
    )
}
export default Breadcrumbs

// ** PropTypes
Breadcrumbs.propTypes = {
    breadCrumbTitle: Proptypes.string.isRequired
}
