import React from 'react';
import styled from 'styled-components';
import data from '../../content/content.json';
import { useTranslation } from "gatsby-plugin-react-i18next";

const styles = data.styles;

const ContactMainContainer = styled.div`
    position: relative;
    background: ${styles.colors.purplePrimary};
    min-height: 210px;
    padding-left: 20px;
    padding-right: 20px;
    @media (min-width: ${styles.breakpoints.m}px) {
        min-height: 210px;
    }
`;

const ContactWrapper = styled.div`
    text-align: center;
    justify-content: center;
    position: absolute;
    top: -115px;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    padding: 35px 17px;
    margin: auto;
    margin-bottom: 12px;
    max-width: 320px;
    border: 3px solid ${styles.colors.darkMainBg};
    /* Sombra como en ServiceWrapper */
    box-shadow: 8px 8px 0 #000; /* Reemplazo la sombra original */
    border-radius: 13px;
    background: ${styles.colors.white};
    @media (min-width: ${styles.breakpoints.m}px) {
        top: -163px;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 37px 92px 39px 94px;
        margin: auto;
        max-width: calc(100% - 40px);
    }
    @media (min-width: ${styles.breakpoints.l}px) {
        max-width: 800px;
    }
`;

const ContactHeading = styled.h2`
    font-size: 2.38em;
    font-weight: ${styles.fontWeight.bold};
    text-align: center;
    @media (min-width: ${styles.breakpoints.m}px) {
        font-size: 3.33em;
        line-height: 64px;
        flex-basis: 100%;
    }
`;

const ContactInfoBlock = styled.div`
    margin-top: 25px;
    @media (min-width: ${styles.breakpoints.m}px) {
        margin-top: 28px;
    }
`;

const Email = styled.span`
    &::before {
        content: url("${require('../../images/email.svg').default}");
        display: inline-block;
        width: 25px; 
        margin-right: 10px;
        margin-top: 3px;
        margin-left: 2px;
    }
    display: flex;
    align-self: flex-start;
    align-items: center;
    flex-direction: row;
    font-size: .88em;
    font-weight: ${styles.fontWeight.bold};
    margin-bottom: 10px;
    text-decoration: none;
    color: ${styles.colors.darkMainBg};
    @media (min-width: ${styles.breakpoints.m}px) {
        font-size: 1em;
        margin-bottom: 7px;
    }
`;

const Office = styled.span`
    &::before {
        content: url("${require('../../images/pin.svg').default}");
        display: inline-block;
        width: 30px; 
        margin-right: 5px;
    }
    display: flex;
    align-self: flex-start;
    align-items: center;
    flex-direction: row;
    font-size: .88em;
    font-weight: ${styles.fontWeight.bold};
    margin-bottom: 10px;
    text-decoration: none;
    color: ${styles.colors.darkMainBg};
    @media (min-width: ${styles.breakpoints.m}px) {
        font-size: 1em;
        margin-bottom: 7px;
    }
`;

const ContactForm = () => {
    const { t } = useTranslation();

    return (
        <ContactMainContainer>
            <ContactWrapper>
                <ContactHeading>
                    {t("contactForm.title")}
                </ContactHeading>
                <ContactInfoBlock>
                    <Email>{t("contactForm.email")}</Email>
                    <Office>{t("contactForm.office1")}</Office>
                    {/* <OfficeList>
                        <OfficeListItem>{t("contactForm.office1")}</OfficeListItem>
                    </OfficeList> */}
                </ContactInfoBlock>
            </ContactWrapper>
        </ContactMainContainer>
    );
};

export default ContactForm;
