class DemoForm {

    get $firstName() { return cy.get('input#first_name') };
    get $lastName() { return cy.get('input#last_name') };
    get $company() { return cy.get('input#company') };
    get $email() { return cy.get('input#email') };
    get $phone() { return cy.get('input#phone') };
    get $message() { return cy.get('textarea#message') };
    get $submitButton() { return cy.get('#lp-pom-button-10[type="submit"]') };

    inputTheFields(data) {
        if (data.firstName) this.$firstName.type(data.firstName);
        if (data.lastName) this.$lastName.type(data.lastName);
        if (data.phone) this.$phone.type(data.phone);
        if (data.company) this.$company.type(data.company);
        if (data.message) this.$message.type(data.message);
        if (data.email) this.$email.type(data.email);
    };

    trySubmitForm() { return this.$submitButton.click(); };

};

export const demoForm = new DemoForm();
