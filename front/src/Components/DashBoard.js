import React, { useState, useEffect } from 'react';
import Header from './Header'
import { Container, Card, Row, Col, Carousel } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { instance } from '../axiosconfig'
import { faCompressArrowsAlt, faCross, faDoorClosed } from '@fortawesome/free-solid-svg-icons';

const DashBoard = () => {

  const [days, setDays] = useState(null)
  const [items, setItems] = useState(null)
  const [day, setDay] = useState(null)

  let getDashData = () => {
    var config = {
      method: 'get',
      url: `admin/getDays`,
    }
    instance(config)
      .then((res) => {
        if (res.data) {
          setDays(res.data.items)
          console.log(res.data)
        }
      }).catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getDashData()
  }, [])

  let getIndData = (day) => {
    var config = {
      method: 'get',
      url: `admin/getFiles?day=${day}`
    }
    instance(config)
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          setDay(day)
          setItems(res.data.files)
        } else {
          setItems(null)
        }
      }).catch((err) => {
        setItems(null)
      })
  }

  return (
    <div>
      <Header />
      <Container className='dash-cont'>
        <div className='d-flex justify-content-between'>
          <h3 className='text-muted'>Admin Panel</h3>
          <h3 className='text-muted'>All Logs</h3>
        </div>

        <Row xs={1} sm={3} xl={3} noGutters='true'>

          {days && days.length !== 0 ?
            (
              days.map((item, index) => {
                return (
                  <Col
                    style={{ "cursor": "pointer" }}
                    className="col-lg-4 ml-auto"
                    onClick={() => {
                      getIndData(item)
                    }}
                  >
                    <Card bg='info'>
                      <div className="p-3 media d-flex">
                        <h1 className="mr-auto"> {days[index].split('-')[0]} </h1>
                        <div className="ml-auto">
                          <h3>{days[index].split('-')[1]}</h3>
                          <span>{days[index].split('-')[2]} - {days[index].split('-')[3]}</span>
                        </div>
                      </div>
                    </Card>
                  </Col>
                )
              })
            ) :
            (<i className='go-center'>no items</i>)}

        </Row>
      </Container>
      {
        items && items.length !== 0 ?
          (
            <div>
              <Container fluid>
                <div className="cOpen animate__animated animate__bounceInRight">
                  <div
                    style={{ 'color': "red", "cursor": "pointer", "position":"absolute" }}
                    onClick={() => {
                      setItems(null)
                    }}
                  >
                    <FontAwesomeIcon icon={faCompressArrowsAlt} />
                  </div>
                  <Container>
                    <Carousel defaultActiveIndex={0} indicators>

                      {items.map((i, index) => {
                        return (
                          <Carousel.Item
                            key={index}
                            interval={10000}>
                            <img
                              className="d-block w-100"
                              src={`http://localhost:5000/static/${day}/${i}`}
                              alt={'add the timeof the day here'}
                            />
                            <Carousel.Caption
                              key={index}
                              className="darkTransparent">
                              <p>{day}</p>
                            </Carousel.Caption>
                          </Carousel.Item>
                        )
                      })}


                    </Carousel>
                  </Container>
                </div>
              </Container>
            </div>
          ) :
          null
      }
    </div >
  );
}

export default DashBoard;
