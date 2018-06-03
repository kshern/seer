const puppeteer = require('puppeteer');
const request = require('request')
const fs = require('fs')
const opts = {
    executablePath:'./Chromium.app/Contents/MacOS/Chromium',
    // headless:false,
    timeout:300000,
    args: [
        '--proxy-server=127.0.0.1:8087', // Charles proxy
        ]
}

var errorPage=[]

let down = async (param,browser)=>{
    if(!param){
        return;
    }
    let uri = param.uri
    let folder = param.folder
    let len = param.len
   
    
    try {
        fs.mkdirSync('./dist/'+folder)
    } catch (error) {
        console.log(error)
    }
    let i=1
    let page = await browser.newPage();
    await page.goto(uri);
       while(i<=len){
        try {     
            if(!(await page.title())){
                await page.reload()
                continue;
            }
            let src=(await page.$eval('#img', el => el.src)) 
            let pageImg = await browser.newPage();
            await page.keyboard.press('ArrowRight');
            await pageImg.goto(src);
            await pageImg.click('img')
            await pageImg.screenshot({path: './dist/'+folder+'/'+i+'.png',fullPage:true})
            // nextHref =  (await page.$eval('#i3 a', el => el.href))
            // page.close()
            pageImg.close()
            console.log(folder+' 第'+i+'页完成')
         
        } catch (error) {
            console.log(error)
            fs.appendFile('./mError', `{name:${folder},page:${i},uri:${pageImg.url()}}\n` , 'utf8',()=>{
                // console.log(`第${p}页完成`)
            });
            continue
        }
        i++
       }
}


var arr = []
var a =async (param) => {
    fs.appendFile('./mError', '\n——————————'+new Date().toLocaleString()+'——————————\n' , 'utf8',()=>{
        // console.log(`第${p}页完成`)
    });
    const browser = await puppeteer.launch(opts);
    var arr = [
        {uri:'uri',folder:'aaa',len:159}
        
    ]

    
    
    // arr.forEach((item)=>{
    //     down(item,browser)
    // })

    let g = 0;
    while(g<arr.length){
        await down(arr[g],browser)
        g++
    }

    // arr.forEach(async (obj)=>{
    //     try {
    //         console.log(obj)
    //         await down(obj,browser)
    //     } catch (error) {
            
    //     }
    // })



    //    for(let j = 0;j<errorPage;j++){
    //     let src=(await page.$eval('#img', el => el.src)) 
    //     pageImg = await browser.newPage();
    //     await pageImg.goto(src);
    //     await pageImg.click('img')
    //     await pageImg.screenshot({path: './dist/e/'+j+'.png',fullPage:true})
    //     pageImg.close()
    //     console.log('出错第'+j+'页完成')
    //    }
    console.log(errorPage)
       browser.close()
  }

a()
// request(uri).pipe(fs.createWriteStream('./dist/a/'+i+'.jpg'))

