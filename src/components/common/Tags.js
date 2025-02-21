import React from 'react';
import styled from 'styled-components'

const TagsContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
`
const TagItem = styled.div`
    margin: 0 6px 8px 0px;
    padding: ${props => props.type.padding };
    border-radius: 10px;
    font-size: 14px;
    font-weight: ${props => props.type.fontWeight };
    background-color: ${props => props.type.background };
    color: ${props => props.type.color };
`

const Tags = (props) => {

    const getTagStyles = (type) =>{
        switch (type) {
            case "labs" : 
                return {
                    background : props.styles.colors.greenLight, 
                    fontWeight : props.styles.fontWeight.regular, 
                    color : props.styles.colors.white,
                    padding : '9px 14px'
                 }
            break
            case "services" : 
                return {
                    background : props.styles.colors.yellow, 
                    fontWeight : props.styles.fontWeight.medium, 
                    color : props.styles.colors.purpleSecondary,
                    padding : '8px 14px'
                }
            break
            default : 
                return {
                    background : props.styles.colors.greenLight, 
                    fontWeight : props.styles.fontWeight.regular, 
                    color : props.styles.colors.white,
                    padding : '8px 14px'
                }
        }
    }

    return (
        <TagsContainer tags={props.tags} type={props.tagsType}>
            {props.tags.map((tag) => {
                return (
                    <TagItem  key = {tag}  type = {getTagStyles(props.tagsType)} styles={props.styles}><p>{ tag }</p></TagItem>
                )}) 
            }
        </TagsContainer>
    );
};

export default Tags;