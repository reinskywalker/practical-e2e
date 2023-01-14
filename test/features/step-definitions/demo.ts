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
    await browser.maximizeWindow()
})

When(/^Perfom web interactions$/, async function () {
   
        let num = 12345
        let strNum = num.toString()

        let ele = await $(`[type=number]`)
        await ele.click()
        for (let i = 0; i < strNum.length; i++) {
            let charStr = strNum.charAt(i)
            await browser.pause(1000)
            await browser.keys(charStr)
        }

    // assert default
    let ele = await $('//select/option[@selected="selected"]')
    let val = ele.getText()
    chai.expect(val).to.equal("Please select an option")
    await browser.debug()

    // select by att
    let ddEle = await $('#dropdown')
    await ddEle.selectByIndex(2)

    /// get list
    let eleArr = await $$(`select > option`)
    let arr = []
    for (let i = 0; i < eleArr.length; i++) {
        let ele = eleArr[i]
        let val = await ele.getText()
        arr.push(val)
    }
    console.log(`>> Options Array:|${arr}|`);

    await $(`=Click Here`).click()
    await $(`=Elemental Selenium`).click()
    let currentWinTitle = await browser.getTitle()
    let parentWinHanle = await browser.getWindowHandle()
    console.log(`>> currentWinTitle: ${currentWinTitle}`);

    // // Switch window
    let winHandles = await browser.getWindowHandles()
    for (let i = 0; i < winHandles.length; i++){
        console.log(`>> Win handle: ${winHandles[i]}`);
        await browser.switchToWindow(winHandles[i])
        currentWinTitle = await browser.getTitle()
        if (currentWinTitle === "Elemental Selenium: Receive a Free, Weekly Tip on Using Selenium like a Pro"){
            await browser.switchToWindow(winHandles[i])
            let headerTxtEleSel = await $(`<h1>`).getText()
            console.log(`>> headerTxtEleSel: ${headerTxtEleSel}`);
            break
        }
    }

    await $(`button=Click for JS Prompt`).click()
    if (await browser.isAlertOpen()) {
        let alertText = await browser.getAlertText()
        console.log(`>> alertText: ${alertText}`);
        await browser.sendAlertText(`Hello JS Prompt...`)
        await browser.acceptAlert()
        await browser.pause(2000)
    }

    // file upload
    await $(`#file-upload`).addValue(`${process.cwd()}/reinskywalker/test/fileupload/dummy.txt`)
    await $('#file-submit').click()

   
    await $(`=iFrame`).click()
    let ele = await $(`#mce_0_ifr`)
    await browser.switchToFrame(ele)
    await $(`#tinymce`).click()
    await browser.keys(["Meta", "A"])
    await browser.pause(1000)
    await browser.keys("Delete")
    await $(`#tinymce`).addValue(`Typing into a frame...`)
    await browser.switchToParentFrame()
    await browser.debug()

})