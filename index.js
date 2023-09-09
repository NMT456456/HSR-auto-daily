import fs from 'fs'
import dns from 'dns'
import open from 'open'

import { checkIn, loginHSR } from './src/checkIn.js'
import * as constants from './src/constants.js'

const date = new Date()
const today = date.getDate()
const month = date.getMonth() + 1
const year = date.getFullYear()

const addCheckedList = () => {
    fs.appendFile(
        constants.CHECK_LIST,
        `${today} / ${month} / ${year} đã điểm danh thành công
`,
        function (err, data) {
            if (err) throw err
        },
    )
}

dns.resolve('www.google.com', async (err) => {
    if (err) {
        console.log('Not internet')
        await open('./src/no_internet.html')
    } else {
        const isSuccess = await checkIn()
        if (isSuccess === true) {
            addCheckedList()
            console.log('Diem danh thanh cong')
        } else if (isSuccess === false) {
            await loginHSR()
        } else {
            console.log(isSuccess)
        }
    }
})
