import puppeteer from 'puppeteer'

const USER_DATA = 'C:\\Users\\NMT45\\AppData\\Local\\Google\\Chrome\\User Data'
const CHROME_PATH = 'C:/Users/NMT45/AppData/Local/Google/Chrome/Application/chrome.exe'

const browser = await puppeteer.launch({
    headless: false,
    userDataDir: USER_DATA,
    executablePath: CHROME_PATH,
    args: ['--disable-features=site-per-process'],
})

const page = await browser.newPage()

await page.goto(
    'https://act.hoyolab.com/bbs/event/signin/hkrpg/index.html?act_id=e202303301540311&hyl_auth_required=true&hyl_presentation_style=fullscreen&lang=vi&plat_type=pc',
)

// // Set screen size
await page.setViewport({ width: 1920, height: 969, args: ['--start-maximized'] })
