import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import neo from "../../../images/neo-tech-high-resolution-logo-transparent.png";

import { CusAuthContext } from "../../../context/cus-authcontext";
function CusFooter() {
  const CusAuth = useContext(CusAuthContext);

  const cusfrontendurl = `${process.env.React_App_Frontend_URL}/customer`;

  const login_frontendurl = `${process.env.React_App_Frontend_URL}/customer/cuslogin`;
  const reg_frontendurl = `${process.env.React_App_Frontend_URL}/customer/cusreg`;
  const faq_frontendurl = `${process.env.React_App_Frontend_URL}/customer/cusaffairs/faq`;
  const consult_frontendurl = `${process.env.React_App_Frontend_URL}/customer/cusaffairs/consultation`;
  const feedback_frontendurl = `${process.env.React_App_Frontend_URL}/customer/cusaffairs/allfeedback`;
  const contactus_frontendurl = `${process.env.React_App_Frontend_URL}/customer/contactus`;
  const aboutus_frontendurl = `${process.env.React_App_Frontend_URL}/customer/aboutus`;
  const breakdown_frontendurl = `${process.env.React_App_Frontend_URL}/customer/mobservices/breakdownrequests`;
  const mobilemain_frontendurl = `${process.env.React_App_Frontend_URL}/customer/mobservices/mobilemain`;

  return (
    <footer
      className="bg-dark text-white py-5"
      style={{ left: 0, bottom: 0, right: 0 }}
    >
      <Container>
        <Row>
          <Col md={3} className="mb-4 mb-md-0">
            <a
              href={cusfrontendurl}
              className="d-flex align-items-center p-0 text-white"
            >
              <img alt="logo" src={neo} width="200px" />
            </a>
            <p className="my-3">
              Your trusted automobile service and repair partner.
            </p>
            <div className="d-flex mt-4">
              <a href="/" className="btn btn-primary d-flex align-items-center">
                <i className="bi bi-facebook fs-5 me-2"></i>{" "}
                {/* Increase icon size with 'fs-3' class */}
                Facebook
              </a>
            </div>
          </Col>
          <Col md={2} className="mb-4 mb-md-0">
            <h5 className="mb-4 fw-bold">Help</h5>
            <ul className="list-unstyled">
              <li>
                <a href={aboutus_frontendurl} className="text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href={contactus_frontendurl} className="text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href={faq_frontendurl} className="text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </Col>
          <Col md={2} className="mb-4 mb-md-0">
            <h5 className="mb-4 fw-bold">Services</h5>
            <ul className="list-unstyled">
              {CusAuth.isLoggedIn && (
                <li>
                  <a
                    href={`${process.env.React_App_Frontend_URL}/customer/appointment/appointnmentMain`}
                    className="text-white"
                  >
                    Appointments
                  </a>
                </li>
              )}
              <li>
                <a href={breakdown_frontendurl} className="text-white">
                  Breakdown
                </a>
              </li>
              <li>
                <a href={mobilemain_frontendurl} className="text-white">
                  Mobile Service
                </a>
              </li>
              {CusAuth.isLoggedIn && (
                <li>
                  <a href={consult_frontendurl} className="text-white">
                    Online Consultation
                  </a>
                </li>
              )}
              {CusAuth.isLoggedIn && (
                <li>
                  <a
                    href={`${process.env.React_App_Frontend_URL}/customer/products`}
                    className="text-white"
                  >
                    Products
                  </a>
                </li>
              )}
            </ul>
          </Col>
          {CusAuth.isLoggedIn && (
            <Col md={2} className="mb-4 mb-md-0">
              <h5 className="mb-4 fw-bold">Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href={reg_frontendurl} className="text-white">
                    Sign Up
                  </a>
                </li>
                <li>
                  <a href={login_frontendurl} className="text-white">
                    Log in
                  </a>
                </li>
                <li>
                  <a href={feedback_frontendurl} className="text-white">
                    Feedbacks
                  </a>
                </li>
              </ul>
            </Col>
          )}
          <Col md={3} className="mb-4 mb-md-0">
            <h5 className="mb-4 fw-bold d-flex align-items-center">
              <i class="bi bi-envelope-at-fill me-2"></i>{" "}
              <a
                href="mailto:neotechmotorssl@gmail.com"
                style={{ color: "white" }}
              >
                neotechmotorssl@gmail.com
              </a>
            </h5>
            <br />
            <h5 className="mb-4 fw-bold d-flex align-items-center">
              <i class="bi bi-telephone-fill me-2"></i>+94 77 123 4567
            </h5>
            <br />
            <h5 className="mb-4 fw-bold d-flex align-items-center">
              <i class="bi bi-geo-alt-fill me-2"></i>Main Street,Battaramulla
            </h5>
          </Col>
        </Row>
        <Row>
          <small className="text-center mt-5">
            &copy; Neo Tech Motors & Services, 2024. All rights reserved.
          </small>
        </Row>
      </Container>
    </footer>
  );
}

export default CusFooter;
