"use strict";(self.webpackChunkfiqus_web=self.webpackChunkfiqus_web||[]).push([[3007],{9691:function(t,e,n){n.r(e),n.d(e,{default:function(){return C}});var i=n(7294),o=n(9),a=n(7929),l=n(1545),p=n(8518),m=n(1496),s=a.W2,r=o.ZP.div.withConfig({displayName:"PostThumbnail__PostThumbnailWrapper",componentId:"sc-fkhsec-0"})(["margin-bottom:50px;max-width:320px;flex-basis:100%;@media (min-width:","px){max-width:351px;}@media (min-width:","px){flex-basis:33%;min-width:300px;max-width:300px;margin-bottom:55px;}"],s.breakpoints.m,s.breakpoints.l),d=(0,o.ZP)(l.Link).withConfig({displayName:"PostThumbnail__PostThumbnailImage",componentId:"sc-fkhsec-1"})(["display:block;border-radius:6px;margin-bottom:10px;height:230px;max-width:320px;overflow:hidden;@media (min-width:","px){height:215px;margin-bottom:15px;}"],s.breakpoints.l),c=(0,o.ZP)(m.Z).withConfig({displayName:"PostThumbnail__Image",componentId:"sc-fkhsec-2"})(["height:100%;"]),h=(0,o.ZP)(l.Link).withConfig({displayName:"PostThumbnail__PostThumbnailTitle",componentId:"sc-fkhsec-3"})(["display:block;font-size:1.16em;line-height:27px;color:",";text-decoration:none;margin-bottom:10px;@media (min-width:","px){font-weight:",";margin-bottom:8px;}"],s.colors.darkMainBg,s.breakpoints.l,s.fontWeight.bold),u=o.ZP.p.withConfig({displayName:"PostThumbnail__PostThumbnailDescription",componentId:"sc-fkhsec-4"})(["font-size:.88em;line-height:20px;margin-bottom:20px;color:",";@media (min-width:","px){margin-bottom:15px;}"],s.colors.darkGrey,s.breakpoints.l),f=o.ZP.div.withConfig({displayName:"PostThumbnail__BtnContainer",componentId:"sc-fkhsec-5"})(["display:flex;flex-wrap:wrap;"]),g=(0,o.ZP)(p.Z).withConfig({displayName:"PostThumbnail__Btn",componentId:"sc-fkhsec-6"})(["font-size:.88em;margin:0;padding:6px 12px;box-shadow:none;border-radius:10px;&:hover{box-shadow:0px 3px 0px ",";}@media (min-width:","px){font-size:.77em;padding:7px 15px;}"],s.colors.lightGrey,s.breakpoints.l),x=function(t){var e=(0,l.useIntl)();return i.createElement(r,null,i.createElement(d,{to:t.shortSlug},i.createElement(c,{fluid:t.fluid,alt:""})),i.createElement(h,{to:t.shortSlug},t.postTitle),i.createElement(u,null,t.postDescription),i.createElement(f,null,i.createElement(g,{type:"btnSecondary",theme:s,isLink:!0,href:t.slug,btnText:e.formatMessage({id:"button.read"})})))},b=a.W2,w=o.ZP.div.withConfig({displayName:"blog__MainWrapper",componentId:"sc-lab6un-0"})(["padding-bottom:180px;@media (min-width:","px){padding-bottom:228px;}"],b.breakpoints.m),k=o.ZP.div.withConfig({displayName:"blog__PostsContainer",componentId:"sc-lab6un-1"})(["padding:40px 20px 0 20px;display:flex;justify-content:center;flex-direction:column;@media (min-width:","){padding-top:55px;padding-left:0;padding-right:0;}"],b.breakpoints.lpx),P=o.ZP.div.withConfig({displayName:"blog__PostsWrapper",componentId:"sc-lab6un-2"})(["display:inline-flex;flex-wrap:wrap;justify-content:center;margin:auto;gap:10px;padding:0;max-width:946px;@media (min-width:","px){justify-content:flex-start;margin:auto;gap:23px;padding:0;}@media (min-width:","px){width:946px;}"],b.breakpoints.m,b.breakpoints.l),y=o.ZP.h1.withConfig({displayName:"blog__BlogTitle",componentId:"sc-lab6un-3"})(["flex-basis:100%;font-size:2.38em;line-height:49px;color:",";margin:0 auto 25px auto;text-align:center;@media (min-width:","px){text-align:left;font-size:3em;line-height:62px;margin-bottom:35px;}"],b.colors.purplePrimary,b.breakpoints.m),_=(0,o.ZP)(p.Z).withConfig({displayName:"blog__Btn",componentId:"sc-lab6un-4"})(["margin:0px auto 15px auto;"]),C=function(t){var e=t.data.allMarkdownRemark.edges,n=(0,l.useIntl)(),o=(0,i.useState)([]),a=o[0],p=o[1],m=(0,i.useState)([]),s=m[0],r=m[1],d=(0,i.useState)(6),c=d[0],h=d[1];(0,i.useEffect)((function(){var t=[];e.forEach((function(e){e.node.frontmatter.lang===n.locale&&t.push(e),p([].concat(t))}))}),[]),(0,i.useEffect)((function(){0!==a.length&&r(a.slice(0,c))}),[a]),(0,i.useEffect)((function(){r(a.slice(0,c))}),[c]);return i.createElement(w,null,i.createElement(k,null,i.createElement(P,null,i.createElement(y,null,"Blog"),s.map((function(t){return i.createElement(x,{postTitle:t.node.frontmatter.title,postDescription:t.node.excerpt,fluid:t.node.frontmatter.image.childImageSharp.fluid,slug:"/"+t.node.frontmatter.lang+"/post"+t.node.frontmatter.slug,shortSlug:"/post"+t.node.frontmatter.slug})}))),i.createElement(_,{isLink:!1,type:"btnPrimaryPurple",theme:b,to:"#",btnText:n.formatMessage({id:"verMasArticulos"}),onButtonClick:function(){c<=a.length&&h(c+6)}})))}}}]);
//# sourceMappingURL=component---src-pages-blog-js-160a757d41560bc8dc91.js.map