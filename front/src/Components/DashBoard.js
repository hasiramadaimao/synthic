import React, { useState, useEffect } from 'react';
import Header from './Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCircleNotch, faLink, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { Container, Card, Row, Button, Col } from 'react-bootstrap'

import { instance } from '../axiosconfig'

const DashBoard = () => {

  const [days, setDays] = useState(null)

  let getDashData = () => {
    var config = {
      method: 'get',
      url: `admin/getDays`,
    }
    instance(config)
      .then((res) => {
        if (res.data) {
          setDays(res.data)
          console.log(res.data)
        }
      }).catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getDashData()
  }, [])


  return (
    <div>
      <Header />
      <Container className='dash-cont'>
        <div className='d-flex justify-content-between'>
          <h3 className='text-muted'>Admin Panel</h3>
          <h3 className='text-muted'>All Logs</h3>
        </div>

        <Row xs={1} sm={3} xl={3} noGutters='true'>

          {days ?
            (
              <Col className="col-lg-4 ml-auto">
                <Card bg='info'>
                  <div className="p-3 media d-flex">
                    <h1 className="mr-auto"><FontAwesomeIcon icon={faLink} /></h1>
                    <div className="ml-auto">
                      <h3>xxx</h3>
                      <span>Subdomains</span>
                    </div>
                  </div>
                </Card>
              </Col>
            ) :
            (<i className='go-center'>no items</i>)}

        </Row>
      </Container>
    </div>
  );
}

export default DashBoard;
