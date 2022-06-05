import{j as e,s as t,G as a,K as s,a as o,r,p as l,v as n,T as i,R as c,b as d,F as h}from"./vendor.f0b31d01.js";var p="/assets/earth.ddd8a3ae.gif";const u=e.exports.jsx,m=e.exports.jsxs,g=({isClaiming:e,mintNFT:t})=>m("div",{className:"mint-nft",children:[u("img",{src:p,alt:"earth-gif"}),u("h1",{children:"Welcome to EarthDAO"}),u("h2",{children:"Mint your EarthDAO NFT"}),u("button",{disabled:e,onClick:t,children:e?"Minting...":"Mint your NFT"})]}),f=()=>{const e=t(),c=a(),d=s("0xbD45bd7EAb169bea6cE8b7CDcc8Bc320b9ae1f19"),h=o("0x8f33Ac1470bE338d73e6a8367649f02ba3A39c68"),[f,y]=r.exports.useState(!1),[b,v]=r.exports.useState(!1),[x,A]=r.exports.useState([]),[w,E]=r.exports.useState([]),F=l("0xF03Cc39b1086749002f56ea8aF6413868aF6a077"),[k,N]=r.exports.useState([]),[I,S]=r.exports.useState(!1),[T,C]=r.exports.useState(!1),D=n();r.exports.useEffect((()=>{if(!f)return;(async()=>{try{const e=await F.getAll();N(e),console.log("Proposals: ",e)}catch(e){console.log("Failed to get proposals: ",e)}})()}),[f,F]);r.exports.useEffect((()=>{if(!f)return;(async()=>{try{const e=await d.history.getAllClaimerAddresses(1);A(e)}catch(e){console.log("Failed to fetch claimer addresses: ",e)}})()}),[f,d.history]),r.exports.useEffect((()=>{f&&k.length}),[]),r.exports.useEffect((()=>{if(!f)return;(async()=>{try{const e=await h.history.getAllHolderBalances();E(e)}catch(e){console.log("Failed to fetch claimer balances: ",e)}})()}),[f,h.history]),r.exports.useEffect((()=>{if(!e)return;(async()=>{try{(await d.balanceOf(e,"1")).gt(0)?(y(!0),console.log("The user already has membership NFT")):(y(!1),console.log("Ther user does not have membership NFT"))}catch(t){y(!1),console.log(t)}})()}),[e,d]);const O=r.exports.useMemo((()=>x.map((e=>{const t=null==w?void 0:w.find((({holder:t})=>t===e));return{address:e,tokenAmount:(null==t?void 0:t.balance.displayValue)||"0"}}))),[x,w]);return e&&(null==D?void 0:D[0].data.chain.id)!==i.Rinkeby?m("div",{className:"unsupported-network",children:[u("h2",{children:"Please connect to Rinkeby"}),u("p",{children:"Please switch on the Rinkeby networks"})]}):e?(console.log(O),f?m("div",{className:"member-page",children:[u("img",{src:p,alt:"earth-gif"}),u("h1",{children:"Earth DAO"}),u("h3",{children:"Welcome tso EarthDAO"}),m("div",{children:[m("div",{children:[u("h2",{children:"Member List"}),m("table",{className:"card",children:[u("thead",{children:m("tr",{children:[u("th",{children:"Address"}),u("th",{children:"Token Amount"})]})}),u("tbody",{children:O.map(((e,t)=>{return m("tr",{children:[u("td",{children:(a=e.address,a.substring(0,6)+"..."+a.substring(a.length-4))}),u("td",{children:e.tokenAmount})]},t);var a}))})]})]}),m("div",{children:[u("h2",{children:"Active Proposals"}),m("form",{onSubmit:async t=>{t.preventDefault(),t.stopPropagation(),S(!0);const a=k.map((e=>{const t={proposalId:e.proposalId,vote:2};return e.votes.forEach((a=>{document.getElementById(e.proposalId+"-"+a.type).checked&&(t.vote=a.type)})),t}));try{await h.getDelegationOf(e)===AddressZero&&await h.delegateTo(e);try{await Promise.all(a.map((async({proposalId:e,vote:t})=>{if(1===(await F.get(e)).state)return F.vote(e,t)})));try{await Promise.all(a.map((async({proposalId:e})=>{if(4===(await F.get(e)).state)return F.execute(e)}))),C(!0),console.log("successfully voted")}catch(s){console.error("failed to execute votes",s)}}catch(s){console.error("failed to vote",s)}}catch(s){console.error("failed to delegate tokens")}finally{S(!1)}},children:[k.map((e=>m("div",{className:"card",children:[u("h5",{children:e.description}),u("div",{children:e.votes.map((({type:t,label:a})=>m("div",{children:[u("input",{type:"radio",id:e.proposalId+"-"+t,name:e.proposalId,value:t,defaultChecked:2===t}),u("label",{htmlFor:e.proposalId+"-"+t,children:a})]},t)))})]},e.proposalId))),u("button",{disabled:I||T,type:"submit",children:I?"Voting...":T?"You Already Voted":"Submit Votes"}),!T&&u("small",{children:"This will trigger multiple transactions that you will need to sign."})]})]})]})]}):u(g,{isClaiming:b,mintNFT:async()=>{try{v(!0),await d.claim("1",1),console.log(`Successfully minted, view it on Opensea: https://testnets.opensea.io/assets/${d.getAddress()}/1`),y(!0)}catch(e){y(!1),console.log("Failed to mint: ",e)}finally{v(!1)}}})):m("div",{className:"landing",children:[u("img",{src:p,alt:"earth-gif"}),u("h1",{children:"Welcome to EarthDAO"}),u("button",{onClick:c,className:"btn-hero",children:"Connect Wallet"})]})},y=i.Rinkeby;c.render(u(d.StrictMode,{children:u(h,{desiredChainId:y,children:u(f,{})})}),document.getElementById("root"));