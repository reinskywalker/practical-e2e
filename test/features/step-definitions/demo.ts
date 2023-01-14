import { Given, When, Then } from "@cucumber/cucumber";
import chai from "chai"


Given(/^Google page is opened$/, async function () {
    await browser.url("https://www.google.com")
    await browser.pause(1000)
})

When(/^Search with (.*)$/, async function (searchItem) {
    let ele = await $(`[name=q]`)
    await ele.setValue(searchItem)
    await browser.keys("Enter")
})

Then(/^Click on the first search result$/, async function () {
    let ele = await $(`<h3>`)
    ele.click()
})

Then(/^URL should match (.*)$/, async function (expectedURL) {
    await browser.waitUntil(async function () {
        return await browser.getTitle() === "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO"
    }, {timeout: 20000, interval: 500, timeoutMsg: `Failed loading WDIO web page: ${await browser.getTitle()}`})

    let url = await browser.getUrl()
    chai.expect(url).to.equal(expectedURL)
})

Given(/^A web page is opened$/, async function () {
    await browser.url("https://www.amazon.com.au")
    await browser.setTimeout({ implicit: 15000, pageLoad: 10000 })
})

When(/^Perfom web interactions$/, async function () {
   
    await browser.execute(() => {
        window.scrollBy(0, window.innerHeight)
    })
    await browser.pause(2000)
     await browser.execute(() => {
        window.scrollBy(0, -window.innerHeight)
    })
    await browser.pause(2000)
    await browser.execute(() => {
        window.scrollTo(0, document.body.scrollHeight)
    })

    await browser.pause(2000)
    await browser.execute(() => {
        window.scrollTo(0, document.body.scrollTop)
    })
    await browser.debug()

})