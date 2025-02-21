"use strict";(self.webpackChunklawal_web=self.webpackChunklawal_web||[]).push([[3007],{9691:function(t,e,n){n.r(e),n.d(e,{default:function(){return v}});var i=n(7294),o=n(9),a=n(7929),r=n(1545),p=n(8518),l=n(1496),s=a.W2,d=o.ZP.div.withConfig({displayName:"PostThumbnail__PostThumbnailWrapper",componentId:"sc-1v4wrht-0"})(["margin-bottom:25px;max-width:320px;flex-basis:100%;background:",";border:4px solid #000;border-radius:14px;padding:20px;box-shadow:8px 8px 0 #000;transition:transform 0.2s ease,box-shadow 0.2s ease;&:hover{transform:translate(4px,4px);box-shadow:4px 4px 0 #000;}@media (min-width:","px){max-width:351px;}@media (min-width:","px){flex-basis:50%;min-width:300px;max-width:460px;margin-bottom:25px;}"],s.colors.white,s.breakpoints.m,s.breakpoints.l),m=(0,o.ZP)(r.Link).withConfig({displayName:"PostThumbnail__PostThumbnailImage",componentId:"sc-1v4wrht-1"})(["display:block;border-radius:10px;margin-bottom:10px;height:230px;max-width:320px;overflow:hidden;border:2px solid #000;@media (min-width:","px){height:215px;margin-bottom:15px;}"],s.breakpoints.l),c=(0,o.ZP)(l.Z).withConfig({displayName:"PostThumbnail__Image",componentId:"sc-1v4wrht-2"})(["height:100%;width:100%;object-fit:cover;"]),x=(0,o.ZP)(r.Link).withConfig({displayName:"PostThumbnail__PostThumbnailTitle",componentId:"sc-1v4wrht-3"})(["display:block;font-size:1.16em;line-height:27px;color:",";text-decoration:none;margin-bottom:10px;font-weight:bold;@media (min-width:","px){margin-bottom:8px;}"],s.colors.darkMainBg,s.breakpoints.l),h=o.ZP.p.withConfig({displayName:"PostThumbnail__PostThumbnailDescription",componentId:"sc-1v4wrht-4"})(["font-size:0.88em;line-height:20px;margin-bottom:20px;color:",";border-bottom:2px solid #000;padding-bottom:10px;@media (min-width:","px){margin-bottom:15px;}"],s.colors.darkGrey,s.breakpoints.l),g=o.ZP.div.withConfig({displayName:"PostThumbnail__BtnContainer",componentId:"sc-1v4wrht-5"})(["display:flex;flex-wrap:wrap;"]),u=(0,o.ZP)(p.Z).withConfig({displayName:"PostThumbnail__Btn",componentId:"sc-1v4wrht-6"})(["font-size:0.88em;margin:0;padding:6px 12px;border:2px solid #000;border-radius:10px;background:",";color:#000;box-shadow:4px 4px 0 #000;transition:transform 0.2s ease,box-shadow 0.2s ease;&:hover{transform:translate(2px,2px);box-shadow:2px 2px 0 #000;}@media (min-width:","px){font-size:0.77em;padding:7px 15px;}"],s.colors.white,s.breakpoints.l),b=function(t){var e=(0,r.useIntl)();return i.createElement(d,null,i.createElement(m,{to:t.shortSlug},i.createElement(c,{fluid:t.fluid,alt:""})),i.createElement(x,{to:t.shortSlug},i.createElement("h3",null,t.postTitle)),i.createElement(h,null,t.postDescription),i.createElement(g,null,i.createElement(u,{type:"btnSecondary",theme:s,isLink:!0,href:t.slug,btnText:e.formatMessage({id:"button.read"})})))},f=a.W2,w=o.ZP.div.withConfig({displayName:"blog__MainWrapper",componentId:"sc-mq4kdb-0"})(["background-color:",";padding-bottom:180px;@media (min-width:","px){padding-bottom:228px;}"],f.colors.celestin,f.breakpoints.m),k=o.ZP.div.withConfig({displayName:"blog__PostsContainer",componentId:"sc-mq4kdb-1"})(["padding:40px 20px 0 20px;display:flex;justify-content:center;flex-direction:column;@media (min-width:","){padding-top:55px;padding-left:0;padding-right:0;}"],f.breakpoints.lpx),P=o.ZP.div.withConfig({displayName:"blog__PostsWrapper",componentId:"sc-mq4kdb-2"})(["display:inline-flex;flex-wrap:wrap;justify-content:center;margin:auto;gap:10px;padding:0;max-width:946px;@media (min-width:","px){justify-content:flex-start;margin:auto;gap:23px;padding:0;}@media (min-width:","px){width:946px;}"],f.breakpoints.m,f.breakpoints.l),y=o.ZP.h1.withConfig({displayName:"blog__BlogTitle",componentId:"sc-mq4kdb-3"})(["flex-basis:100%;font-size:2.38em;line-height:49px;color:",";margin:0 auto 25px auto;text-align:center;@media (min-width:","px){text-align:left;font-size:3em;line-height:62px;margin-bottom:35px;}"],f.colors.purplePrimary,f.breakpoints.m),_=(0,o.ZP)(p.Z).withConfig({displayName:"blog__Btn",componentId:"sc-mq4kdb-4"})(["margin:0px auto 15px auto;"]),v=function(t){var e=t.data.allMarkdownRemark.edges,n=(0,r.useIntl)(),o=(0,i.useState)([]),a=o[0],p=o[1],l=(0,i.useState)([]),s=l[0],d=l[1],m=(0,i.useState)(6),c=m[0],x=m[1];(0,i.useEffect)((function(){var t=[];e.forEach((function(e){e.node.frontmatter.lang===n.locale&&t.push(e),p([].concat(t))}))}),[]),(0,i.useEffect)((function(){0!==a.length&&d(a.slice(0,c))}),[a]),(0,i.useEffect)((function(){d(a.slice(0,c))}),[c]);return i.createElement(w,null,i.createElement(k,null,i.createElement(P,null,i.createElement(y,null,"Blog"),s.map((function(t){return i.createElement(b,{postTitle:t.node.frontmatter.title,postDescription:t.node.excerpt,fluid:t.node.frontmatter.image.childImageSharp.fluid,slug:"/"+t.node.frontmatter.lang+"/post"+t.node.frontmatter.slug,shortSlug:"/post"+t.node.frontmatter.slug})}))),i.createElement(_,{isLink:!1,type:"btnPrimaryPurple",theme:f,to:"#",btnText:n.formatMessage({id:"verMasArticulos"}),onButtonClick:function(){c<=a.length&&x(c+6)}})))}}}]);
//# sourceMappingURL=component---src-pages-blog-js-37115485189b32cc38d3.js.map