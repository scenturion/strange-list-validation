Feature: Check Item Exists
  As a user
  I want to validate critical functionalities



  Scenario: Create a new item
    Given I navigato to the application
    When I upload the image from "./data-test" folder with name "robocop.jpeg"
    When I enter "robocop" into the new  input
    And I press Enter
    Then I should see "robocop" in the  list
    And the  count should be 1 

  
  Scenario: Edit an existing item
    Given I navigato to the application
    And there is an existing  item "robocop"
    When I double click on the  item "robocop"
    And I change the text to "robocop 2"
    And I press Enter
    Then I should see "robocop 2" in the  list
    And I should not see "robocop" in the  list 


  Scenario: Delete an  item
    Given I navigato to the application
    And there is an existing  item "robocop"
    When I hover over the  item "robocop"
    And I click the delete button
    Then I should not see "robocop" in the  list
    And the  count should be 0 

  Scenario: Validate maximum length of  item
    Given I navigato to the application
    When I enter a string of 300 characters into the new  input
    Then the input should only accept the first 256 characters
    And I should be able to create the  item with truncated text 

  Scenario: Check for specific item
    Given I navigato to the application
    Then I should see a  item with text "Creators: Matt Duffer, Ross Duffer" 