import React, {useState, useEffect} from 'react';
import {Link, useStaticQuery} from 'gatsby'
import styled from 'styled-components'

const BtnImg = styled.img`
    display: ${props => props.imgDisplay};
    height: 20px;
    margin-right: 6px;
`
const setSharedStyles = (type) => {
    return `
        margin: 0px;
        padding: 9px 20px;
        margin-bottom: 5px;    
        margin-right: 10px;
        font-size: 18px;
        font-size: ${type.fontSize};
        font-weight: ${type.fontWeight};
        color: ${type.color };
        background-color: ${type.background};
        border-radius: 12px;
        border-color: ${type.borderColor};
        border-width: 2px!important;
        border-style: solid;
        box-shadow:  0px 4px 0px ${type.boxShadow};
        transition: 100ms ease-in-out all;
        margin-bottom: 10px;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:hover {
            box-shadow: none;
        };
    `
} ;

const BtnLink = styled(Link)`
    ${props => setSharedStyles(props.$btnStyles)} 
`
const BtnCta = styled.button`
    ${props => setSharedStyles(props.$btnStyles)} 
`

const Button = (props) => {    
    const getBtnStyles = (type) =>{
        switch (type) {
            case "btnPrimaryOrange" : 
                return {
                    background : props.theme.colors.orangeMain,
                    borderColor : props.theme.colors.darkMainBg,
                    boxShadow : props.theme.colors.darkMainBg, 
                    fontWeight : props.theme.fontWeight.bold, 
                    color : props.theme.colors.white,
                    imgDisplay : 'none'
                 }
            break
            case "btnPrimaryWhite" : 
                return {
                    background : props.theme.colors.white,
                    borderColor : props.theme.colors.darkMainBg,
                    boxShadow : props.theme.colors.darkMainBg, 
                    fontWeight : props.theme.fontWeight.bold, 
                    color : props.theme.colors.darkMainBg,
                    imgDisplay : 'none'
                }
            break
            case "btnPrimaryOrangePurple" : 
                return {
                    background : props.theme.colors.orangeMain,
                    borderColor : props.theme.colors.purplePrimary,
                    boxShadow : props.theme.colors.purplePrimary, 
                    fontWeight : props.theme.fontWeight.bold, 
                    color : props.theme.colors.white,
                    imgDisplay : 'none'
                 }
            break
            case "btnPrimaryYellow" : 
                return {
                    background : props.theme.colors.yellow,
                    borderColor : props.theme.colors.purplePrimary,
                    boxShadow : props.theme.colors.purplePrimary, 
                    fontWeight : props.theme.fontWeight.bold, 
                    color : props.theme.colors.purplePrimary,
                    imgDisplay : 'none'
                }
            break
            case "btnPrimaryPurple" : 
                return {
                    background : props.theme.colors.white,
                    borderColor : props.theme.colors.purplePrimary,
                    boxShadow : props.theme.colors.purplePrimary, 
                    fontWeight : props.theme.fontWeight.bold, 
                    color : props.theme.colors.purplePrimary,
                    imgDisplay : 'none'
                }
            break
            case "btnSecondary" : 
                return {
                    background : props.theme.colors.transparent,
                    borderColor : props.theme.colors.lightGrey,
                    boxShadow : props.theme.colors.lightGrey, 
                    fontSize: '14px',
                    fontWeight : props.theme.fontWeight.medium, 
                    color : props.theme.colors.darkGrey,
                    imgDisplay : 'none'
                 }
            break
            case "btnLabeled" : 
                return {
                    background : props.theme.colors.white,
                    borderColor : props.theme.colors.darkMainBg,
                    boxShadow : props.theme.colors.darkMainBg, 
                    fontWeight : props.theme.fontWeight.bold, 
                    color : props.theme.colors.darkMainBg,
                    imgDisplay : 'static'
                 }
            break
            default : 
                return {
                    background : props.theme.colors.white,
                    borderColor : props.theme.colors.darkMainBg,
                    boxShadow : props.theme.colors.darkMainBg,
                    fontWeight : props.theme.fontWeight.bold, 
                    color : props.theme.colors.darkMainBg,
                    imgDisplay : 'none'
                }
        }   
    }

    const handleClick = (event) => {
        event.preventDefault();
        if (props.onButtonClick) props.onButtonClick(event);
    }
    
    return (
        props.isLink ? 
            <BtnLink to={props.href} className={props.className} $btnStyles={getBtnStyles(props.type)} theme={props.theme} href={props.href} target={props.target}>
                <BtnImg 
                    imgDisplay={getBtnStyles(props.type).imgDisplay} 
                    src={props.github ? require('../../images/icon_github.svg').default : require('../../images/icon_website.svg').default} />
                {props.btnText}
            </BtnLink>                     
        : 
            <BtnCta className={props.className} $btnStyles={getBtnStyles(props.type)} theme={props.theme} onClick={handleClick}>
                <BtnImg 
                    imgDisplay={getBtnStyles(props.type).imgDisplay} 
                    src={props.github ? require('../../images/icon_github.svg').default : require('../../images/icon_website.svg').default} />
                {props.btnText}
            </BtnCta>
        
    );
}
export default Button;