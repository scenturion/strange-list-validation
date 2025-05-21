@bug @toFix
Feature: scenarios that currently has bug - to fix

Scenario: Prevent item creation if image is not uploaded
  Given I navigato to the application
  And I upload the image from "./data-test" folder with name "robocop.jpeg"
  And I enter "robocop" into the new  input
  And I press Enter
  When I enter "terminator" into the new  input
  And I press Enter
  Then I should not see "terminator" in the  list
  And the  count should be 1

Scenario: Prevent duplicate items with same description and image
  Given I navigato to the application
  And I upload the image from "./data-test" folder with name "robocop.jpeg"
  And I enter "robocop" into the new  input
  And I press Enter
  And I upload the image from "./data-test" folder with name "robocop.jpeg"
  And I enter "robocop" into the new  input
  And I press Enter
  Then the number of items with text "robocop" should be 1