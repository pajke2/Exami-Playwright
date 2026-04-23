Feature: UserLogin
    Scenario: Succesfull login with valid credentials
        Given User is on the login page
        When User enters valid email and password
        Then User is redirected to Subject page