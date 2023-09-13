import puppeteer from 'puppeteer'
import 'dotenv/config'

import * as constants from './constants.js'

const website = async (headlessOption = 'new') => {
    try {
        const browser = await puppeteer.launch({
            headless: headlessOption,
            userDataDir: process.env.USER_DATA || constants.USER_DATA,
            executablePath: process.env.CHROME_PATH || constants.CHROME_PATH_1,
            args: ['--disable-features=site-per-process'],
        })

        const page = await browser.newPage()

        await page.goto(constants.PAGE, {
            waitUntil: 'networkidle0',
        })

        // // Set screen size
        await page.setViewport({ width: 1920, height: 969, args: ['--start-maximized'] })

        return { page, browser }
    } catch (error) {}

    try {
        const browser = await puppeteer.launch({
            headless: headlessOption,
            userDataDir: process.env.USER_DATA || constants.USER_DATA,
            executablePath: process.env.CHROME_PATH || constants.CHROME_PATH_2,
            args: ['--disable-features=site-per-process'],
        })

        const page = await browser.newPage()

        await page.goto(constants.PAGE, {
            waitUntil: 'networkidle0',
        })

        // // Set screen size
        await page.setViewport({ width: 1920, height: 969, args: ['--start-maximized'] })

        return { page, browser }
    } catch (error) {}
}

export const checkIn = async () => {
    const { page, browser } = await website()

    await page.waitForTimeout(5000)

    const checkedElement =
        (await page.$$('.components-pc-assets-__prize-list_---item---F852VZ')) || undefined

    if (checkedElement === undefined) {
        await browser.close()
        return false
    }

    for (const el of checkedElement) {
        await el.click()
    }

    await page.waitForTimeout(3000)

    const loginElement = (await page.$('.mhy-account-dialog-scroll-container')) || undefined
    const checkedSuccessElement = (await page.$('.m-dialog-wrapper')) || undefined

    if (loginElement !== undefined) {
        await browser.close()
        return false // login
    }
    if (checkedSuccessElement !== undefined) {
        await browser.close()
        return true // success
    }
    if (loginElement === undefined && checkedSuccessElement === undefined) {
        await browser.close()
        return 'Hom nay da diem danh roi'
    }
}

export const loginHSR = async () => {
    const { page, browser } = await website(false)

    await page.waitForTimeout(5000)

    const loginElement = await page.$('.mhy-hoyolab-account-block')

    loginElement.click()
}
