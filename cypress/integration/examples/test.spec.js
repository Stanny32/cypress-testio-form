/// <reference types="cypress" />

import { demoForm } from "../../pageobjects/demo.form";
import * as inputs from "../../test-data/inputs.json";

context('Submitting form ', () => {

  beforeEach(() => {
    cy.getDemoForm();
  })

  it('with no inputs', () => {
    demoForm.trySubmitForm();
    demoForm.$firstName.should('have.length', 1).then(($input) => {
      expect($input[0].validationMessage).to.eq('This field is required.')
    })
  })

  it('with no last name', () => {
    const data = { ...inputs, lastName: ''};

    demoForm.inputTheFields(data);
    demoForm.trySubmitForm();
    demoForm.$lastName.should('have.length', 1).then(($input) => {
      expect($input[0].validationMessage).to.eq('This field is required.')
    })
  })

  it('with invalid email', () => {
    const data = { ...inputs, email: 'j@.'};

    demoForm.inputTheFields(data);
    demoForm.trySubmitForm();
    demoForm.$email.should('have.length', 1).then(($input) => {
      expect($input[0].validationMessage).to.eq('Please enter a valid email address.');
    })
  })

  it('with non-corporate email', () => {
    const data = { ...inputs, email: 'stanny32@gmail.com'};

    demoForm.inputTheFields(data);
    demoForm.trySubmitForm();
    demoForm.$email.should('have.length', 1).then(($input) => {
      expect($input[0].validationMessage).to.eq('Please enter your work email address.')
    })
  })

  it('with invalid phone', () => {
    const data = { ...inputs, phone: '911'};;

    demoForm.inputTheFields(data);
    demoForm.trySubmitForm();
    demoForm.$email.should('have.length', 1).then(($input) => {
      expect($input[0].validationMessage).to.eq('Please enter valid phone number')
    })
  })

  it('with executable code in textarea', () => {
    const data = { ...inputs, message: '<script>alert("ooops")</script>'};

    demoForm.inputTheFields(data);
    demoForm.trySubmitForm();
    demoForm.$message.should('have.length', 1).then(($input) => {
      expect($input[0].validationMessage).to.eq('unknown expected result')
    })

    // making test fail on purpose -> should have some security validation
    // unknown expected result
  })

  it('with valid inputs (positive)', () => {
    const data = inputs;
    
    demoForm.inputTheFields(data)
    demoForm.trySubmitForm();
    cy.url().should(url => {
      expect(url).to.eq('https://test.io/thank-you/')
    })
  })
})
