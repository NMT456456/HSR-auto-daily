import fs from 'fs'
import dns from 'dns'
import cmd from 'node-cmd'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { checkIn, loginHSR } from './checkIn.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const date = new Date()
const today = date.getDate()
const month = date.getMonth() + 1
const year = date.getFullYear()

const addCheckedList = () => {
    fs.appendFile(
        process.env.CHECK_LIST,
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
        cmd.runSync(`start "" "${__dirname}/no_internet.html"`)
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
