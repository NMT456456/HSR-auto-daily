import fs from 'fs'

import { checkIn, loginHSR } from './checkIn.js'

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

const hsrAutoCheckIn = async () => {
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

hsrAutoCheckIn()
