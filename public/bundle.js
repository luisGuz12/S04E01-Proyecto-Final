console.log(" ☀☀ Client Server working powered by Webpackpack ☀☀")
,function()
{let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"No message given";
console.log(e)}(),async function()
{console.log("Calling");
const e=await new Promise((e=>{setTimeout((()=>{e("resolved")}),2e3)}));console.log(e)}();