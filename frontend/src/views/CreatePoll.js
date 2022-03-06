import { useState } from "react"
import { useFormik, Form, FormikProvider } from "formik"
import { Row, Col, Input, Label, FormFeedback, Button } from "reactstrap"
import Flatpickr from "react-flatpickr"
import * as Yup from "yup"

import { handleSuccess, handleError } from "../utility/alert"

import { addPoll } from "../services/logic"

// ----------------------------------------------------------------------

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss"

export default function CreatePoll(props) {
    // ** Props
    const { setShow } = props
    const [expiry, setExpiry] = useState(new Date())

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            expiry: "",
            options: [
                {
                    option: ""
                },
                {
                    option: ""
                },
                {
                    option: ""
                }
            ]
        },
        //validationSchema: RegisterSchema,
        onSubmit: async (data) => {
            console.log(data)
            const isSuccess = await addPoll(data)
            setShow(false)
            if (isSuccess) {
                handleSuccess(
                    "Transaction Successful",
                    "Click the below button to return home"
                )
            } else {
                handleError(
                    "Transaction Failed!",
                    "Click the below button to return home"
                )
            }
        }
    })

    const {
        errors,
        //touched,
        handleSubmit,
        //isSubmitting,
        getFieldProps,
        setFieldValue
    } = formik

    return (
        <FormikProvider value={formik}>
            <Form autoComplete='on' noValidate onSubmit={handleSubmit}>
                <Row className='gy-1 pt-75'>
                    <Col md={8} xs={12}>
                        <Label className='form-label' for='title'>
                            Title
                        </Label>
                        <Input
                            {...getFieldProps("title")}
                            id='title'
                            placeholder='Enter the title of the poll'
                            invalid={errors.title && true}
                        />
                        {errors.title && (
                            <FormFeedback>
                                Please enter a valid title
                            </FormFeedback>
                        )}
                    </Col>
                    <Col md={4} xs={12}>
                        <Label className='form-label' for='expiry'>
                            Poll Expiry
                        </Label>
                        <Flatpickr
                            className='form-control'
                            value={expiry}
                            onChange={(newValue) => {
                                setExpiry(newValue[0])
                                setFieldValue(
                                    "expiry",
                                    newValue[0].toUTCString()
                                )
                            }}
                            id='default-picker'
                        />
                    </Col>
                    <Col md={12} xs={12}>
                        <Label className='form-label' for='description'>
                            Description
                        </Label>
                        <Input
                            {...getFieldProps("description")}
                            type='textarea'
                            id='description'
                            placeholder='Enter the description of the poll'
                            invalid={errors.description && true}
                        />
                        {errors.description && (
                            <FormFeedback>
                                Please enter a valid description
                            </FormFeedback>
                        )}
                    </Col>
                    <Col md={4} xs={12}>
                        <Label className='form-label' for='option1'>
                            Option 1
                        </Label>
                        <Input
                            {...getFieldProps("options[0].option")}
                            id='option1'
                            placeholder='Enter valid option'
                        />
                        {errors.option1 && (
                            <FormFeedback>
                                Please enter a valid option
                            </FormFeedback>
                        )}
                    </Col>
                    <Col md={4} xs={12}>
                        <Label className='form-label' for='option2'>
                            Option 2
                        </Label>
                        <Input
                            {...getFieldProps("options[1].option")}
                            id='option2'
                            placeholder='Enter valid option'
                        />
                        {errors.option2 && (
                            <FormFeedback>
                                Please enter a valid option
                            </FormFeedback>
                        )}
                    </Col>
                    <Col md={4} xs={12}>
                        <Label className='form-label' for='option3'>
                            Option 3
                        </Label>
                        <Input
                            {...getFieldProps("options[2].option")}
                            id='option3'
                            placeholder='Enter valid option'
                        />
                        {errors.option2 && (
                            <FormFeedback>
                                Please enter a valid option
                            </FormFeedback>
                        )}
                    </Col>
                    <Col xs={12} className='text-center mt-2 pt-50'>
                        <Button type='submit' className='me-1' color='primary'>
                            Submit
                        </Button>
                        <Button
                            type='reset'
                            color='secondary'
                            outline
                            onClick={() => setShow(false)}
                        >
                            Discard
                        </Button>
                    </Col>
                </Row>
            </Form>
        </FormikProvider>
    )
}
