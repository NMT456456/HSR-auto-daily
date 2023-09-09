import os from 'os'

const homedir = os.userInfo().homedir

const USER_DATA = `${homedir}\\AppData\\Local\\Google\\Chrome\\User Data`
const CHROME_PATH_1 = `C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe`
const CHROME_PATH_2 = `${homedir}\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe`
const PAGE =
    'https://act.hoyolab.com/bbs/event/signin/hkrpg/index.html?act_id=e202303301540311&hyl_auth_required=true&hyl_presentation_style=fullscreen&lang=vi&plat_type=pc'
const CHECK_LIST = './src/checked-list.log'

export { USER_DATA, CHROME_PATH_1, CHROME_PATH_2, PAGE, CHECK_LIST }
