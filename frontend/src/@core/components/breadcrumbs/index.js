// ** React Imports
import { Link } from "react-router-dom"

// ** Third Party Components
import Proptypes from "prop-types"
import { Grid, CheckSquare, MessageSquare, Mail, Calendar } from "react-feather"

// ** Reactstrap Imports
import {
    Breadcrumb,
    DropdownMenu,
    DropdownItem,
    BreadcrumbItem,
    DropdownToggle,
    Button
} from "reactstrap"

const BreadCrumbs = (props) => {
    // ** Props
    const {
        breadCrumbTitle,
        breadCrumbParent,
        breadCrumbParent2,
        breadCrumbParent3,
        breadCrumbActive
    } = props

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
                                {breadCrumbParent2 ? (
                                    <BreadcrumbItem
                                        tag='li'
                                        className='text-primary'
                                    >
                                        {breadCrumbParent2}
                                    </BreadcrumbItem>
                                ) : (
                                    ""
                                )}
                                {breadCrumbParent3 ? (
                                    <BreadcrumbItem
                                        tag='li'
                                        className='text-primary'
                                    >
                                        {breadCrumbParent3}
                                    </BreadcrumbItem>
                                ) : (
                                    ""
                                )}
                                <BreadcrumbItem tag='li' active>
                                    {breadCrumbActive}
                                </BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                    </div>
                </div>
            </div>
            <div className='content-header-right text-md-end col-md-5 col-12 d-md-inline d-none'>
                <Button.Ripple color='primary' outline className='me-2' onClick={handleRegisterButton}>
                    Add Identity
                </Button.Ripple>
                <Button.Ripple color='primary' outline  onClick={openPoll}>
                    Add Poll
                </Button.Ripple>
            </div>
        </div>
    )
}
export default BreadCrumbs

// ** PropTypes
BreadCrumbs.propTypes = {
    breadCrumbTitle: Proptypes.string.isRequired
}
