Feature: Running Feature

    @runner
    Scenario Outline: Begin testcase
        Given Tokopedia page is opened


        Examples:
            | TestID | SearchItems       | ExpectedURLs  |
            | TC-001 | Headset Bluetooth | tokopedia.com |