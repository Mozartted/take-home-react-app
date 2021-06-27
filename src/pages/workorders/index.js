import React, { useState, useEffect}from "react"
import {Container, Row, Col, Form, InputGroup, Button} from "react-bootstrap"
import classnames from "classnames"
import {PenTool, Search} from "react-feather"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'react-dates/initialize';
import Api from "../../utils/api"
import {api} from "../../configs"
import {useToasts} from 'react-toast-notifications'
import FullCalendar, { formatDate } from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import swal from "sweetalert"
import {withRouter, useHistory, Link} from "react-router-dom"
// import DatePicker from "../../components/datetime"
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/light.css";

const localizer = momentLocalizer(moment)

const CustomerView = (props) => {

    const {addToast} = useToasts()
    const history = useHistory()

    // States decleared here
    const [events, updateEvents] =useState([
        {
          start: moment().toDate(),
          end: moment()
            .add(1, "days")
            .toDate(),
          title: "Some title",
          resource: "Stringing Event for the next tuesday"
        }
      ])
    const [services, updateServices] =useState([])
    const [dateRange, updateDateRange] =useState({
        start_range: null,
        end_range: null,
        focused: null
    })
    const [params, updateParams] =useState({
        name: null,
        service_id: null,
        customer_email: null
    })
    const [customerParams, updateCustomerParams] = useState({
        username: null,
        email: null
    })

    // End of state declaration

    const updateParamEvent = (e) => {
        updateParams({
            ...params,
            [e.target.name]: e.target.value
        })
    }

    const updateCustomerParamsEvent = (e) => {
        updateCustomerParams({
            ...customerParams,
            [e.target.name]: e.target.value
        })
    }

    const getServiceTypes = async () => {
        try {
            let resp = await api.get('/services');
            if(resp){
                console.log(resp)
                let serviceList = resp.data.map((item, value) => {
                    return {
                        title: `${item.name}, duration - ${Math.round((item.duration / 60) * 10) / 10} hours`,
                        id: item.id
                    }
                })
                updateServices(serviceList)
            }
        } catch (e) {
            addToast(e, {
                appearance: "error",
                autoDismiss: true
            })
        }
    }

    const getWorkOrders = async () => {
        try {
            let resp = await api.get('/workorders');
            if(resp){
                console.log(resp)
                let NewOrders = resp.data.map((item, value) => {
                    return {
                        title: item.name,
                        start: moment(item.start_time).toDate(),
                        end: moment(item.end_time).toDate()
                    }
                })
                console.log(NewOrders)
                updateEvents(NewOrders)
            }
        } catch (e) {
            addToast(e, {
                appearance: "error",
                autoDismiss: true
            })
        }
    }

    const filterForDate = async () => {
        try {
            let resp = await api.get(`/workorders?start_range=${dateRange.start_range}&end_range=${dateRange.end_range}`);
            if(resp){
                console.log(resp)
                let NewOrders = resp.data.map((item, value) => {
                    return {
                        title: item.name,
                        start: moment(item.start_time).toDate(),
                        end: moment(item.end_time).toDate()
                    }
                })
                updateEvents(NewOrders)
            }
        } catch (e) {
            addToast(e, {
                appearance: "error",
                autoDismiss: true
            })
        }
    }

    const createNewWorkOrder = async () => {
        try {
            let resp = await api.post('/workorder/create', params);
            if(resp){
                console.log(resp)
                swal("Welldone",`You just added another created an appointment for ${moment(resp.data.start_time).format('DD MMM, hh:mm a')}`, "success" )
                await getWorkOrders()
            }
        } catch (e) {
            // console.log(e)
            addToast(e.message, {
                appearance: "error",
                autoDismiss: true
            })
        }
    }

    const createNewCustomer = async () => {
        try {
            let resp = await api.post('/customer/create', customerParams);
            if(resp){
                swal("Welldone",`You just created a new customer`, "success" )
                // await getWorkOrders()
            }
        } catch (e) {
            // console.log(e)
            addToast(e.message, {
                appearance: "error",
                autoDismiss: true
            })
        }
    }

    useEffect(() => {
        getWorkOrders()
        getServiceTypes()
    }, [])
    return (
        <Container fluid>
            <Row className={classnames("justify-content-center")}>
                <Col md={5} className={classnames("text-center mt-5")}>
                    <h1>Schedule and manage your appointments</h1>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={4}>
                    <Row>
                        <Col md={9} className={classnames("text-center mt-5")}>
                            <Row>
                                <Col md={6}>
                                    <Flatpickr
                                        data-enable-time
                                        options={
                                            {
                                                altFormat: "F j, Y"
                                            }
                                        }
                                        placeholder="Start range"
                                        value={dateRange.start_range}
                                        className="form-control"
                                        onChange={date => {
                                            // console.log(date)
                                            updateDateRange({...dateRange, start_range: moment(date[0]).format()});
                                        }}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Flatpickr
                                        data-enable-time
                                        options={
                                            {
                                                altFormat: "F j, Y",
                                                minDate: dateRange.start_range
                                            }
                                        }
                                        placeholder="End range"
                                        minDate={dateRange.start_range}
                                        value={dateRange.end_range}
                                        className="form-control"
                                        onChange={date => {
                                            // console.log(date)
                                            updateDateRange({...dateRange, end_range: moment(date[0]).format()});
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col md="auto" className={classnames("text-center mt-5")}>
                            <Button onClick={filterForDate}>
                                <Search />
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col md={3} className={classnames("mt-5")}>
                   <Row>
                       <Col md={12}>
                           <h3>Create a new Order appointment</h3>
                       </Col>
                       <Col md={12}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name="customer_email" onChange={e => updateParamEvent(e)} />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Appointment Title</Form.Label>
                                <Form.Control type="" placeholder="Title of your appointment" name="name" onChange={e => updateParamEvent(e)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                {/* <Form.Select aria-label="Default select example">
                                    <option>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select> */}
                                <Form.Label>Service type</Form.Label>
                                <select className="form-control" name="service_id" onChange={e => updateParamEvent(e)}>
                                    <option>Select a service</option>
                                    {services.map((service) => {
                                        return <option value={service.id}>{service.title}</option>
                                    })}
                                </select>
                            </Form.Group>
                            <Button variant="primary" block onClick={createNewWorkOrder}>
                                Create new Order <PenTool/>
                            </Button>
                        </Col>
                   </Row>
                   <hr/>
                   <Row>
                        <Col md={12} className="mt-4">
                            <h3>Create new customer</h3>
                        </Col>

                       <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name="email" onChange={e => updateCustomerParamsEvent(e)} />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="" placeholder="Title of your appointment" name="username" onChange={e => updateCustomerParamsEvent(e)} />
                            </Form.Group>

                            <Button variant="primary" block onClick={createNewCustomer}>
                                Create new customer <PenTool/>
                            </Button>
                        </Col>
                   </Row>
                </Col>
               <Col md={8} className={classnames("text-center mt-5")}>
                   {/* <Calendar
                       localizer = {localizer}
                       events={events}
                       startAccessor="start"
                       endAccessor="end"
                       popup={true}
                       style={{height: 600}}
                   /> */}

                    <FullCalendar
                        plugins={[ dayGridPlugin ]}
                        initialView="dayGridMonth"
                        //   weekends={false}
                        events={events}
                    />
                </Col>
            </Row>
        </Container>
    )

}

export default withRouter(CustomerView)